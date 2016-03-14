import Piece from './Piece';

class Knight extends Piece {
  static symbol = 'n';
  static classStub = 'knight';
  static moveDescriptor = {
    knightwards: true
  };
  getValue() {
    return 3;
  }
}

export default Knight;
