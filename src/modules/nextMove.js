const nextMove = (player, position) => {
  const getPossibleMoves = (player) => {
    return player.pieces.reduce((moves, piece) => {
      moves.push(...piece.possibleMoves(position));
      return moves;
    }, []);
  };

  const score = (move) => {
    return Math.random();
  };

  return getPossibleMoves(player).sort((a, b) => score(a) > score(b) ? 1 : -1)[0];
};

export default nextMove;
