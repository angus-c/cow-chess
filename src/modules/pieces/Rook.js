import Piece from './Piece';

class Rook extends Piece {
  static symbol = 'r';
  static classStub = 'rook';
  static moveDescriptor = {
    cardinal: move => true,
    projectable: true
  }
  getValue() {
    return 5;
  }
}

export default Rook;
