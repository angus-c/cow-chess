import Piece from './Piece';

class Rook extends Piece {
  static symbol = 'r';
  static classStub = 'rook';
  static moveDescriptor = {
    diagonal: move => false,
    cardinal: move => true,
    projectable: true,
    knightwards: false,
    jumps: false
  }
  getValue() {
    return 5;
  }
}

export default Rook;
