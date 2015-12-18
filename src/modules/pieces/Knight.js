import Piece from './Piece';

class Knight extends Piece {
  static symbol = 'n';
  static classStub = 'knight';
  static moveDescriptor = {
    diagonal: false,
    cardinal: false,
    projectable: false,
    knightwards: true,
    jumps: true
  }
  getValue() {
    return 3;
  }
}

export default Knight;
