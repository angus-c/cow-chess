import game from '../data/game';

const nextMove = (player, position, depth) => {
  const getPossibleMoves = (player) => {
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

  const deepScore = (move, depth) => {
    let counterScore = 0;
    if (depth > 0) {
      counterScore = deepScore(nextMove(
        game.getOtherPlayer(move.owner),
        simulateMove(position, move),
        depth - 1
      ));
    }
    return score(move) - counterScore;
  };

  const score = (move) => {
    return 1;
  };

  // TODO: merge with game.applyMove?
  const simulateMove = (position, move) => {
    const tempPosition = [...position];
    tempPosition[move.to] = tempPosition[move.from];
    tempPosition[move.from] = null;
    return tempPosition;
  };

  return getPossibleMoves(player).sort(
    (a, b) => deepScore(a, depth) > deepScore(b, depth) ? 1 : -1)[0];
};

export default nextMove;
