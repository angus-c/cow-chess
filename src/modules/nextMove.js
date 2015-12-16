const nextMove = (position, player) => {
  const possibleMoves = player.pieces.reduce((moves, piece) => {
    moves.push(...piece.possibleMoves(position));
    return moves;
  }, []);
  return possibleMoves[Math.floor(possibleMoves.length * Math.random())];
};

export default nextMove;
