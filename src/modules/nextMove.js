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
  const moveTime = profiler('moveTime');
  const firstPass = getSortedMoves(player, position, 2);
  const shortlist = firstPass.slice(0, firstPass.length / 2);
  const secondsPass = getSortedMoves(player, position, 3, shortlist);
  const secondShortlist = secondsPass.slice(0, secondsPass.length / 3);
  const move = getSortedMoves(player, position, depth, secondShortlist)[0];
  move.time = moveTime.getElapsed();
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
  let counterScore = 0, sortedReplies;
  if (depth > 0) {
    // TODO: use cached value?
    sortedReplies = getSortedMoves(
      game.getOtherPlayer(move.player),
      simulateMove(move, position),
      depth - 1
    );
    move.numberOfReplies = sortedReplies.length;
    counterScore = sortedReplies[0] ? sortedReplies[0].score : 0;
  }
  const thisScore = score(move, position, depth) - counterScore;
  (thisScore > bestScoreSoFar) && (bestScoreSoFar = thisScore);
  return thisScore;
};

const score = (move, position, depth) => {
  let score = 1;
  const {player, captures, forwardLeft, forwardRight, backwardLeft, backwardRight} = move;

  // piece capture
  if (captures) {
    score += captures.getValue();
  }

  // number of possible replies
  score -= (move.numberOfReplies || 0) / 10;

  // pawn support
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
