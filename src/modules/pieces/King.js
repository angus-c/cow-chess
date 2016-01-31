import Piece from './Piece';

class King extends Piece {
  static symbol = 'k';
  static classStub = 'king';
  static moveDescriptor = {
    diagonal: true,
    cardinal: true
  };
  getValue() {
    return Number.INFINITY;
  }
}

export default King;
