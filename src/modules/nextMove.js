import game from '../data/game';
import profiler from '../utilities/profiler';

import Pawn from './pieces/Pawn';

let movesLookup;

let bestScoreSoFar = -100, originalPlayer, requestedDepth;

const nextMove = (player, position, depth) => {
  movesLookup = {
    north: {},
    south: {}
  };
  originalPlayer = player;
  requestedDepth = depth;
  const timeForNextMove = profiler('timeForNextMove');
  const firstPass = getSortedMoves(player, position, 2);
  const shortlist = firstPass.slice(0, firstPass.length / 3);
  const move = getSortedMoves(player, position, depth, shortlist)[0];
  timeForNextMove.stop();
  return move;
};

const getSortedMoves = (player, position, depth, possibleMoves) => {
  !possibleMoves && (possibleMoves = getPossibleMoves(player, position));
  const scoredMoves = possibleMoves.map(move => {
    move.score = deepScore(move, position, depth);
    return move;
  });
  return scoredMoves.sort(
    (a, b) => a.score < b.score ? 1 : -1);
};

const getPossibleMoves = (player, position) => {
  const savedMoves = movesLookup[player.name][position.toStr];
  if (savedMoves) {
    return savedMoves;
  }
  const moves = position.reduce((moves, sq, id) => {
    if (sq && sq.owner == player) {
      sq.squareId = id;
      moves.push(...sq.possibleMoves(position));
    }
    return moves;
  }, []);

  movesLookup[player.name][position.toStr] = moves;
  return moves;
};

const deepScore = (move, position, depth) => {
  let counterScore = 0;
  if (depth > 0) {
    const bestMove = getSortedMoves(
      game.getOtherPlayer(move.player),
      simulateMove(move, position),
      depth - 1
    )[0];
    move.bestReply = bestMove;
    counterScore = bestMove ? bestMove.score : 0;
  }
  const thisScore = score(move, position, depth) - counterScore;
  (thisScore > bestScoreSoFar) && (bestScoreSoFar = thisScore);
  return thisScore;
};

// TODO: this is a mess
const score = (move, position, depth) => {
  const player = move.player;
  // TODO: attach all this to move
  const newRow = 1 + Math.floor(move.to / 8);
  const newColumn = 1 + (move.to % 8);
  const nextRow = newRow < 8 ? newRow + player.relativeDirection(1) : null;
  const previousRow = newRow > 1 ? newRow - player.relativeDirection(1) : null;
  const previousColumn = newColumn > 1 ? newColumn - player.relativeDirection(1) : null;
  const nextColumn = newColumn < 8 ? newColumn + player.relativeDirection(1) : null;
  let forwardLeft, forwardRight, backwardLeft, backwardRight;
  if (nextRow) {
    if (previousColumn) {
      forwardLeft = (nextRow - 1) * 8 + (previousColumn - 1);
    }
    if (nextColumn) {
      forwardRight = (nextRow - 1) * 8 + (nextColumn - 1);
    }
  }
  if (previousRow) {
    if (previousColumn) {
      backwardLeft = (previousRow - 1) * 8 + (previousColumn - 1);
    }
    if (nextColumn) {
      backwardRight = (previousRow - 1) * 8 + (nextColumn - 1);
    }
  }

  let score = 1;

  if (move.captures) {
    score += move.captures.getValue();
  }
  // UGH... clean the fuck up
  if (position[move.from] instanceof Pawn) {
    if (position[forwardLeft] && (position[forwardLeft].owner === player)) {
      score += 1;
    }
    if (position[forwardRight] && (position[forwardRight].owner === player)) {
      score += 1;
    }
  }
  if (
    position[backwardLeft] &&
    (position[backwardLeft] instanceof Pawn) &&
    (position[backwardLeft].owner === player)) {
      score += 1;
  }
  if (
    position[backwardRight] &&
    (position[backwardRight] instanceof Pawn) &&
    (position[backwardRight].owner === player)) {
      score += 1;
  }

  return score;
};

const simulateMove = (move, position) => {
  const tempPosition = [...position];
  tempPosition.toStr = position.toStr;
  game.updatePosition(tempPosition, move);
  return tempPosition;
};

export default nextMove;
