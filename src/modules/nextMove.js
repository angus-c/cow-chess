import game from '../data/game';
import profiler from '../utilities/profiler';

const movesLookup = {
  north: {},
  south: {}
};

const nextMove = (player, position, depth) => {
  const timeForNextMove = profiler('timeForNextMove');
  const move = getBestMove(player, position, depth);
  timeForNextMove.stop();
  return move;
};

const getBestMove = (player, position, depth) => {
  const scoredMoves = getPossibleMoves(player, position).map(move => {
    move.score = deepScore(move, position, depth);
    return move;
  });
  if (depth == 4) {
    console.log(scoredMoves);
  }
  return scoredMoves.sort(
    (a, b) => a.score < b.score ? 1 : -1)[0];
};

const getPossibleMoves = (player, position) => {
  const {pieceMap, stringMap} = position;
  const savedMoves = movesLookup[player.name][stringMap];
  if (savedMoves) {
    return savedMoves;
  }
  const pieces = [];
  // excuse the mutation...
  pieceMap.forEach((sq, id) => {
    if (sq && sq.owner == player) {
      sq.squareId = id;
      pieces.push(sq);
    }
  });
  const moves = pieces.reduce((moves, piece) => {
    moves.push(...piece.possibleMoves(pieceMap));
    return moves;
  }, []);
  return (movesLookup[player.name][stringMap] = moves);
};

const deepScore = (move, position, depth) => {
  let counterScore = 0;
  if (depth > 0) {
    const bestMove = getBestMove(
      game.getOtherPlayer(move.player),
      simulateMove(move, position),
      depth - 1
    );
    move.bestReply = bestMove;
    counterScore = bestMove ? bestMove.score : 0;
  }
  return score(move, depth) - counterScore;
};

const score = (move, depth) => {
  let score = 1;
  move.captures && (score += move.captures.getValue());
  return score;
};

const simulateMove = (move, position) => {
  const tempPosition = position.cloneMe();
  tempPosition.applyMove(move);
  return tempPosition;
};

export default nextMove;
