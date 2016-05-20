import Piece from './Piece';

class Bishop extends Piece {
  static symbol = 'b';
  static classStub = 'bishop';
  static moveDescriptor = {
    diagonal: true,
    projectable: true
  }
  getValue() {
    return 3;
  }
}

export default Bishop;
