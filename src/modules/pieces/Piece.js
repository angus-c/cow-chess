import computer from '../players/computer';
import human from '../players/human';

class Piece {
  constructor(x, y, player) {
    this.position = [x, y];
    this.owner = player;
  }
  
  possibleMoves(position) {
    let moves = [];
    let {diagonal, cardinal, knightwards, jumps} = this.constructor.moveDescriptor;
    diagonal && possibleMoves.push(...possibleDiagonalMoves(position));
    cardinal && possibleMoves.push(...possibleCardinalMoves(position));
    knightwards && possibleMoves.push(...possibleKinghtMoves(position));
    return moves;
  }
  
  possibleDiagonalMoves(position) {
    let col, row, moves = [];
    [-1, 1].forEach(columnDir => {
      [-1, 1].forEach(rowDir => {
        [col, row] = this.position;
        while(col += columnDir, row += rowDir, isOnBoard(col, row)) {
          const isCapture = position[col, row];
          let diagonal = this.constructor.moveDescriptor.diagonal;
          if (typeof diagonal == 'function' && !diagonal(isCapture)) {
            break;
          }
          moves.push(new Move(this.position, [col, row]));
          if (!this.constructor.moveDescriptor.projectable) {
            break;
          }
        }
      });
    });
  }
  possibleCardinalMoves(cardinal, projectable) {}
  possibleKinghtMoves(projectable) {}
  
  isOnBoard(col, row) {
    return (1 <= col) && (col <= 8) && (1 <= row) && (row <= 8);
  }
  
  render() {
    return (this.owner === human) ?
      this.constructor.symbol.toUpperCase() :
      this.constructor.symbol.toLowerCase();
  }
}

export default Piece;
