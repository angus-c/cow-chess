import game from '../data/game';

const nextMove = (player, position, depth) => {
  return bestMove(player, position, depth);

  function bestMove(player, position, depth) {
    const scoredMoves = getPossibleMoves(player, position).map(move => {
      move.score = deepScore(move, position, depth);
      return move;
    });
    return scoredMoves.sort(
      (a, b) => a.score < b.score ? 1 : -1)[0];
  }

  function getPossibleMoves(player, position) {
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
  }

  function deepScore(move, position, depth) {
    let counterScore = 0;
    if (depth > 0) {
      counterScore = bestMove(
        game.getOtherPlayer(move.player),
        simulateMove(position, move),
        depth - 1
      ).score;
    }
    return score(move, depth, position) - counterScore;
  }

  function score(move, depth, position) {
    let score = 1;
    move.captures && (score += move.captures.getValue());
    // negatively weight score according to look ahead distance
    return score * Math.floor((depth + 1) / 2);
  }

  function simulateMove(position, move) {
    const tempPosition = [...position];
    tempPosition[move.to] = tempPosition[move.from];
    tempPosition[move.from] = null;
    return tempPosition;
  }
};

export default nextMove;
