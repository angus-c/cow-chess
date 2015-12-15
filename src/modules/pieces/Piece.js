import north from '../players/north';
import south from '../players/south';

// TODO: remove subclass reference
import Pawn from './Pawn';
import Move from '../Move';

class Piece {
  constructor(squareId, player) {
    this.squareId = squareId;
    this.owner = player;
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

  possibleMoves(position) {
    let moves = [];
    let {diagonal, cardinal/* , knightwards, jumps */ } = this.constructor.moveDescriptor;
    diagonal && moves.push(...this.possibleDiagonalMoves(position));
    cardinal && moves.push(...this.possibleCardinalMoves(position));
    // knightwards && moves.push(...this.possibleKinghtMoves(position));
    return moves;
  }

  // TODO: genericize some of this
  possibleDiagonalMoves(position) {
    let column, row, destinationId, moves = [];
    [-1, 1].forEach(columnDir => {
      [-1, 1].forEach(rowDir => {
        column = this.squareId % 8;
        row = Math.floor(this.squareId / 8);
        while (column += columnDir, row += rowDir, this.isOnBoard(row, column)) {
          destinationId = column + row * 8;
          const destinationPiece = position[destinationId];
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
          moves.push(new Move(this.squareId, destinationId));
          if (!projectable) {
            break;
          }
        }
      });
    });
    return moves;
  }

  // TODO: genericize some of this
  possibleCardinalMoves(position) {
    let column, row, destinationId, moves = [];
    [-1, 0, 1].forEach(columnDir => {
      [-1, 0, 1].forEach(rowDir => {
        if (columnDir == 0 || rowDir == 0 && (columnDir != rowDir)) {
          column = this.squareId % 8;
          row = Math.floor(this.squareId / 8);
          while (column += columnDir, row += rowDir, this.isOnBoard(row, column)) {
            destinationId = column + row * 8;
            const destinationPiece = position[destinationId];
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
            moves.push(new Move(this.squareId, destinationId));
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

  possibleKinghtMoves(position) {}

  afterMove(destination) {
    this.squareId = destination;
  }

  isOnBoard(column, row) {
    return (0 <= column) && (column <= 7) && (0 <= row) && (row <= 7);
  }

  render() {
    return (this.owner === north) ?
      this.constructor.symbol.toUpperCase() :
      this.constructor.symbol.toLowerCase();
  }
}

export default Piece;
