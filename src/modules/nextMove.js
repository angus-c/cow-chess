const nextMove = (position, player) => {
  let possibleMoves;
  const pieces = player.pieces;
  // TODO: random for now - get best move
  do {
    possibleMoves = pieces[Math.floor(pieces.length * Math.random())].possibleMoves(position);
  } while (!possibleMoves.length);

  return possibleMoves[Math.floor(possibleMoves.length * Math.random())];
};

export default nextMove;
