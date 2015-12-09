import Piece from './Piece';

class Queen extends Piece {
  static symbol = 'q';
  static moveDescriptor = {
    diagonal: move => true,
    cardinal: move => true,
    projectable: true,
    knightwards: false,
    jumps: false
  }
}

export default Queen;
