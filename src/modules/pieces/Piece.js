import computer from '../players/computer';
import human from '../players/human';

import Move from '../Move';

class Piece {
  constructor(x, y, player) {
    this.square = [x, y];
    this.owner = player;
  }
  
  possibleMoves(position) {
    let moves = [];
    let {diagonal, cardinal, knightwards, jumps} = this.constructor.moveDescriptor;
    diagonal && moves.push(...this.possibleDiagonalMoves(position));
    cardinal && moves.push(...this.possibleCardinalMoves(position));
    // knightwards && moves.push(...this.possibleKinghtMoves(position));
    return moves;
  }
  
  possibleDiagonalMoves(position) {
    let col, row, moves = [];
    [-1, 1].forEach(columnDir => {
      [-1, 1].forEach(rowDir => {
        [col, row] = this.square;
        while(col += columnDir, row += rowDir, this.isOnBoard(col, row)) {
          const isCapture = position[col][row] && (position[col][row].player != this.owner);
          let diagonal = this.constructor.moveDescriptor.diagonal;
          debugger;
          if (typeof diagonal == 'function' && !diagonal(isCapture)) {
            break;
          }
          moves.push(new Move(this.square, [col, row]));
          if (!this.constructor.moveDescriptor.projectable) {
            break;
          }
        }
      });
    });
    return moves;
  }
  
  possibleCardinalMoves(position) {
    let col, row, moves = [];
    [-1, 0, 1].forEach(columnDir => {
      [-1, 0, 1].forEach(rowDir => {
        if (columnDir == 0 || rowDir == 0) {
          [col, row] = this.square;
          while(col += columnDir, row += rowDir, this.isOnBoard(col, row)) {
            const destinationPiece = position[col][row];
            const isCapture = destinationPiece && (destinationPiece.player != this.owner);
            let cardinal = this.constructor.moveDescriptor.cardinal;
            if (
              (destinationPiece && !isCapture) ||
              (typeof cardinal == 'function' && !cardinal(isCapture))
            ) {
              break;
            }
            moves.push(new Move(this.square, [col, row]));
            if (destinationPiece || !this.constructor.moveDescriptor.projectable) {
              break;
            }
          }
        }
      });
    });
    return moves;
  }
  
  possibleKinghtMoves(position) {}
  
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
