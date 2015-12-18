import Piece from './Piece';

class King extends Piece {
  static symbol = 'k';
  static classStub = 'king';
  static moveDescriptor = {
    diagonal: true,
    cardinal: true,
    projectable: false,
    knightwards: false,
    jumps: false
  }
  getValue() {
    return Number.INFINITY;
  }
}

export default King;
