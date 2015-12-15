import Piece from './Piece';

class Pawn extends Piece {
  static symbol = 'p';
  static classStub = 'pawn';
  static moveDescriptor = {
    diagonal: (isCapture, forwards) => isCapture && forwards,
    cardinal: (isCapture, forwards) => !isCapture && forwards,
    projectable: rank => rank == 2,
    knightwards: false,
    jumps: false
  }

  hasMoved = false;

  afterMove() {
    this.hasMoved = true;
  }
}

export default Pawn;
