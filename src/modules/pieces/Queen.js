import Piece from './Piece';

class Queen extends Piece {
  static symbol = 'q';
  static classStub = 'queen';
  static moveDescriptor = {
    diagonal: move => true,
    cardinal: move => true,
    projectable: true
  };
  getValue() {
    return 10;
  }
}

export default Queen;
