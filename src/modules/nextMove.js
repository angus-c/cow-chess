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
    // console.log(' '.repeat((3 - depth) * 4) + move.toString());
    if (depth > 0) {
      counterScore = nextMove(
        game.getOtherPlayer(move.player),
        simulateMove(position, move),
        depth - 1
      ).score;
    }
    return score(move) - counterScore;
  };

  const score = (move) => {
    return Math.floor(Math.random() * 100);
  };

  // TODO: merge with game.applyMove?
  const simulateMove = (position, move) => {
    const tempPosition = [...position];
    tempPosition[move.to] = tempPosition[move.from];
    tempPosition[move.from] = null;
    return tempPosition;
  };

  const scoredMoves = getPossibleMoves(player).map(move => ({move, score: deepScore(move, depth)}));
  const bestMoveWrapper = scoredMoves.sort(
    (a, b) => a.score > b.score ? 1 : -1)[0];
  return bestMoveWrapper.move;
};

export default nextMove;
