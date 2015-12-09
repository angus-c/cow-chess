import Piece from './Piece';

class Rook extends Piece {
  static symbol = 'r';
  static moveDescriptor = {
    diagonal: move => false,
    cardinal: move => true,
    projectable: true,
    knightwards: false,
    jumps: false
  }
}

export default Rook;
