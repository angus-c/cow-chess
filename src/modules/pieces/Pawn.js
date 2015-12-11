import Piece from './Piece';

class Pawn extends Piece {
  static symbol = 'p';
  static moveDescriptor = {
    diagonal: (isCapture, forwards) => isCapture && forwards,
    cardinal: (isCapture, forwards) => !isCapture && forwards,
    projectable: false, /* TODO */
    knightwards: false,
    jumps: false
  }
}

export default Pawn;
