import game from '../data/game';

const nextMove = (player, position, depth) => {
  return getBestMove(player, position, depth);
};

const getBestMove = (player, position, depth) => {
  const scoredMoves = getPossibleMoves(player, position).map(move => {
    move.score = deepScore(move, position, depth);
    return move;
  });
  if (depth == 3) {
    console.log(scoredMoves);
  }
  return scoredMoves.sort(
    (a, b) => a.score < b.score ? 1 : -1)[0];
};

const getPossibleMoves = (player, position) => {
  const pieces = [];
  // excuse the mutation...
  position.forEach((sq, id) => {
    if (sq && sq.owner == player) {
      sq.squareId = id;
      pieces.push(sq);
    }
  });
  return pieces.reduce((moves, piece) => {
    moves.push(...piece.possibleMoves(position));
    return moves;
  }, []);
};

const deepScore = (move, position, depth) => {
  let counterScore = 0;
  if (depth > 0) {
    const bestMove = getBestMove(
      game.getOtherPlayer(move.player),
      simulateMove(position, move),
      depth - 1
    );
    move.bestReply = bestMove;
    counterScore = bestMove ? bestMove.score : 0;
  }
  return score(move, depth, position) - counterScore;
};

const score = (move, depth, position) => {
  let score = 1;
  move.captures && (score += move.captures.getValue());
  // negatively weight score according to look ahead distance
  return score * Math.floor((depth + 1) / 2);
};

const simulateMove = (position, move) => {
  const tempPosition = [...position];
  tempPosition[move.to] = tempPosition[move.from];
  tempPosition[move.from] = null;
  return tempPosition;
};

export default nextMove;
