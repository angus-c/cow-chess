import game from '../data/game';
import profiler from '../utilities/profiler';

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
  const move = getSortedMoves(player, position, depth)[0];
  timeForNextMove.stop();
  return move;
};

const getSortedMoves = (player, position, depth) => {
  const scoredMoves = getPossibleMoves(player, position).map(move => {
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
  const thisScore = score(move, depth) - counterScore;
  (thisScore > bestScoreSoFar) && (bestScoreSoFar = thisScore);
  return thisScore;
};

const score = (move, depth) => {
  let score = 1;
  move.captures && (score += move.captures.getValue());
  return score;
};

const simulateMove = (move, position) => {
  const tempPosition = [...position];
  tempPosition.toStr = position.toStr;
  game.updatePosition(tempPosition, move);
  return tempPosition;
};

export default nextMove;
