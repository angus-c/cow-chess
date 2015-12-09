import Piece from './Piece';

class Pawn extends Piece {
  static symbol = 'p';
  static moveDescriptor = {
    diagonal: isCapture => isCapture,
    cardinal: isCapture => !isCapture,
    projectable: true,
    knightwards: false,
    jumps: false
  }
}

export default Pawn;
