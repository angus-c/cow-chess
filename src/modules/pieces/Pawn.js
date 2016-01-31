import Piece from './Piece';

class Pawn extends Piece {
  static symbol = 'p';
  static classStub = 'pawn';
  static moveDescriptor = {
    diagonal: (isCapture, forwards) => isCapture && forwards,
    cardinal: (isCapture, forwards) => !isCapture && forwards,
    projectable: rank => rank == 2
  };
  getValue() {
    return 1;
  }
}

export default Pawn;
