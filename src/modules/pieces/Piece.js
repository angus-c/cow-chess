import south from '../players/south';

// TODO: remove subclass reference
import Pawn from './Pawn';
import Move from '../Move';

class Piece {
  constructor(player) {
    this.owner = player;
    this.hasMoved = false;
  }

  getClassName() {
    return this.constructor.classStub ?
      `${this.getColor() == 'white' ? 'w' : 'b'}-${this.constructor.classStub}` :
      null;
  }

  getColor() {
    // TODO: support color switch
    return this.owner === south ? 'white' : 'black';
  }

  getRank(id) {
    return this.owner === south ?
      8 - Math.floor((id || this.squareId) / 8) :
      1 + Math.floor((id || this.squareId) / 8);
  }

  possibleMoves(pieceMap) {
    let moves = [];
    let {diagonal, cardinal/* , knightwards, jumps */ } = this.constructor.moveDescriptor;
    diagonal && moves.push(...this.possibleDiagonalMoves(pieceMap));
    cardinal && moves.push(...this.possibleCardinalMoves(pieceMap));
    // knightwards && moves.push(...this.possibleKnightMoves(pieceMap));
    return moves;
  }

  // TODO: genericize some of this
  possibleDiagonalMoves(pieceMap) {
    let column, row, destinationId, moves = [];
    [-1, 1].forEach(columnDir => {
      [-1, 1].forEach(rowDir => {
        column = this.squareId % 8;
        row = Math.floor(this.squareId / 8);
        while (column += columnDir, row += rowDir, this.isOnBoard(row, column)) {
          destinationId = column + row * 8;
          const destinationPiece = pieceMap[destinationId];
          const isCapture = destinationPiece && (destinationPiece.owner != this.owner);
          const diagonal = this.constructor.moveDescriptor.diagonal;
          const forwards = this.owner.relativeDirection(rowDir) == 1;
          let projectable = this.constructor.moveDescriptor.projectable;
          (typeof projectable == 'function') && (projectable = projectable(this.getRank()));

          if (
            (destinationPiece && !isCapture) ||
            (typeof diagonal == 'function' && !diagonal(isCapture, forwards))
          ) {
            break;
          }
          const move = new Move(this.squareId, destinationId, this.owner);
          if (destinationPiece) {
            // TODO: make more visible
            move.captures = destinationPiece;
          }
          moves.push(move);
          if (destinationPiece || !projectable) {
            break;
          }
        }
      });
    });
    return moves;
  }

  // TODO: genericize some of this
  possibleCardinalMoves(pieceMap) {
    let column, row, destinationId, moves = [];
    [-1, 0, 1].forEach(columnDir => {
      [-1, 0, 1].forEach(rowDir => {
        if ((columnDir == 0 || rowDir == 0) && (columnDir != rowDir)) {
          column = this.squareId % 8;
          row = Math.floor(this.squareId / 8);
          while (column += columnDir, row += rowDir, this.isOnBoard(row, column)) {
            destinationId = column + row * 8;
            const destinationPiece = pieceMap[destinationId];
            const isCapture = destinationPiece && (destinationPiece.owner != this.owner);
            const cardinal = this.constructor.moveDescriptor.cardinal;
            const forwards = this.owner.relativeDirection(rowDir) == 1;
            let projectable = this.constructor.moveDescriptor.projectable;
            (typeof projectable == 'function') && (projectable = projectable(this.getRank()));
            if (
              (destinationPiece && !isCapture) ||
              (typeof cardinal == 'function' && !cardinal(isCapture, forwards))
            ) {
              break;
            }
            const move = new Move(this.squareId, destinationId, this.owner);
            if (destinationPiece) {
              // TODO: make more visible
              move.captures = destinationPiece;
            }
            moves.push(move);
            if (
              destinationPiece ||
              !projectable ||
              (this instanceof Pawn) && (this.getRank(destinationId) == 4) /* TODO */
            ) {
              break;
            }
          }
        }
      });
    });
    return moves;
  }

  possibleKnightMoves(pieceMap) {}

  afterMove(destination) {
    this.hasMoved = true;
  }

  isOnBoard(column, row) {
    return (0 <= column) && (column <= 7) && (0 <= row) && (row <= 7);
  }
}

export default Piece;
