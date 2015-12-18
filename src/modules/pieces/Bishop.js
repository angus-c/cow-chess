import Piece from './Piece';

class Bishop extends Piece {
  static symbol = 'b';
  static classStub = 'bishop';
  static moveDescriptor = {
    diagonal: true,
    cardinal: false,
    projectable: true,
    knightwards: false,
    jumps: false
  }
  getValue() {
    return 3;
  }
}

export default Bishop;
