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
}

export default Knight;
