// TODO: get rid of these client refs
import game from '../client/data/game';
import profiler from '../client/utilities/profiler';

import Pawn from '../client/modules/pieces/Pawn';

let movesLookup;

let bestScoreSoFar, originalPlayer, requestedDepth;
// store in closure scope because passing it through recursion is hella messy
let currentRecursionScore;

const nextMove = (player, position) => {
  debugger;
  console.log('******nextMove******');
  console.log('player', player, 'position', position);
  const {probeDepth, cutOffDepth, cutOffProportion} = game.get().config;
  bestScoreSoFar = Number.NEGATIVE_INFINITY;
  movesLookup = {
    north: {},
    south: {}
  };
  originalPlayer = player;
  requestedDepth = probeDepth;
  const moveTime = profiler('moveTime');
  const firstPass = getSortedMoves(player, position, cutOffDepth);
  const shortlist = firstPass.slice(0, firstPass.length * cutOffProportion);
  const move = getSortedMoves(player, position, requestedDepth, shortlist)[0];
  move.time = moveTime.getElapsed();
  return move;
};

const getSortedMoves = (player, position, depth, possibleMoves) => {
  !possibleMoves && (possibleMoves = getPossibleMoves(player, position));
  const scoredMoves = possibleMoves.map(move => {
    // excuse the side effects
    if (depth == requestedDepth) {
      // initialize score for this move drill-down
      currentRecursionScore = 0;
    }
    const score = deepScore(move, position, depth);
    if (depth == requestedDepth) {
      // update top level best score
      (score > bestScoreSoFar) && (bestScoreSoFar = score);
    }
    move.score = score;
    return move;
  });
  return scoredMoves.sort(
    (a, b) => a.score < b.score ? 1 : -1);
};

const getPossibleMoves = (player, position) => {
  const savedMoves = movesLookup[player][position.toStr];
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
  // TODO: cache this?
  const shallowScore = score(move, position, depth);
  if (move.player === originalPlayer) {
    currentRecursionScore += shallowScore;
  } else {
    currentRecursionScore -= shallowScore;
  }
  if (depth > 0) {
    const giveIn =
      (move.player == originalPlayer) &&
      (depth != requestedDepth) &&
      (currentRecursionScore < bestScoreSoFar);
    if (!giveIn) {
      sortedReplies = getSortedMoves(
        game.getOtherPlayer(move.player),
        simulateMove(move, position),
        depth - 1
      );
      move.numberOfReplies = sortedReplies.length;
      move.bestReply = sortedReplies[0];
      counterScore = sortedReplies[0] ? sortedReplies[0].score : 0;
    }
  }
  const thisScore = shallowScore - counterScore;
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
  // if (position[move.from] instanceof Pawn) {
  //   if (position[forwardLeft] && (position[forwardLeft].owner === player)) {
  //     score += 1;
  //   }
  //   if (position[forwardRight] && (position[forwardRight].owner === player)) {
  //     score += 1;
  //   }
  // }
  // if (
  //   position[backwardLeft] &&
  //   (position[backwardLeft] instanceof Pawn) &&
  //   (position[backwardLeft].owner === player)) {
  //     score += 1;
  // }
  // if (
  //   position[backwardRight] &&
  //   (position[backwardRight] instanceof Pawn) &&
  //   (position[backwardRight].owner === player)) {
  //     score += 1;
  // }

  return score;
};

const simulateMove = (move, position) => {
  const tempPosition = [...position];
  tempPosition.toStr = position.toStr;
  game.updatePosition(tempPosition, move);
  return tempPosition;
};

export default nextMove;
