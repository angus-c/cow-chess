import south from '../players/south';
// import profiler from '../../utilities/profiler';

// TODO: remove subclass reference
import Pawn from './Pawn';

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
    let {diagonal, cardinal, knightwards} = this.constructor.moveDescriptor;
    diagonal && moves.push(...this.possibleDiagonalMoves(pieceMap));
    cardinal && moves.push(...this.possibleCardinalMoves(pieceMap));
    knightwards && moves.push(...this.possibleKnightMoves(pieceMap));
    return moves;
  }

  possibleDiagonalMoves(pieceMap) {
    let column, row, moves = [];
    [-1, 1].forEach(columnDir => {
      [-1, 1].forEach(rowDir => {
        column = this.squareId % 8;
        row = Math.floor(this.squareId / 8);
        while (column += columnDir, row += rowDir, this.isOnBoard(row, column)) {
          const {destinationId, destinationPiece, isCapture, forwards, projectable} =
            this.getMoveDetails(column, row, pieceMap, rowDir);
          const diagonal = this.constructor.moveDescriptor.diagonal;
          if (
            (destinationPiece && !isCapture) ||
            (typeof diagonal == 'function' && !diagonal(isCapture, forwards))
          ) {
            break;
          }
          const move = {from: this.squareId, to: destinationId, player: this.owner};
          this.addMoveInfo(move, destinationPiece, pieceMap);
          moves.push(move);
          if (destinationPiece || !projectable) {
            break;
          }
        }
      });
    });
    return moves;
  }

  possibleCardinalMoves(pieceMap) {
    let column, row, moves = [];
    [-1, 0, 1].forEach(columnDir => {
      [-1, 0, 1].forEach(rowDir => {
        if ((columnDir == 0 || rowDir == 0) && (columnDir != rowDir)) {
          column = this.squareId % 8;
          row = Math.floor(this.squareId / 8);
          while (column += columnDir, row += rowDir, this.isOnBoard(row, column)) {
            const {destinationId, destinationPiece, isCapture, forwards, projectable} =
              this.getMoveDetails(column, row, pieceMap, rowDir);
            const cardinal = this.constructor.moveDescriptor.cardinal;
            if (
              (destinationPiece && !isCapture) ||
              (typeof cardinal == 'function' && !cardinal(isCapture, forwards))
            ) {
              break;
            }
            const move = {from: this.squareId, to: destinationId, player: this.owner};
            this.addMoveInfo(move, destinationPiece, pieceMap);
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

  possibleKnightMoves(pieceMap) {
    let row, column, moves = [];
    [-2, -1, 1, 2].forEach(columnDir => {
      [-2, -1, 1, 2].forEach(rowDir => {
        if (Math.abs(columnDir) + Math.abs(rowDir) == 3) {
          column = (this.squareId % 8) + columnDir;
          row = Math.floor(this.squareId / 8) + rowDir;
          if (this.isOnBoard(column, row)) {
            const destinationId = this.squareId + columnDir + (rowDir * 8);
            const destinationPiece = pieceMap[destinationId];
            if (destinationPiece && (destinationPiece.owner === this.owner)) {
              return;
            }
            const move = {from: this.squareId, to: destinationId, player: this.owner};
            this.addMoveInfo(move, destinationPiece, pieceMap);
            moves.push(move);
          }
        }
      });
    });
    return moves;
  }

  addMoveInfo(move, destinationPiece) {
    if (destinationPiece) {
      move.captures = destinationPiece;
    }
    const player = move.player;
    // TODO: attach all this to move
    const toRow = 1 + Math.floor(move.to / 8);
    const toColumn = 1 + (move.to % 8);
    const rowAhead = toRow < 8 ? toRow + player.relativeDirection(1) : null;
    const rowBehind = toRow > 1 ? toRow - player.relativeDirection(1) : null;
    const columnLeft = toColumn > 1 ? toColumn - player.relativeDirection(1) : null;
    const columnRight = toColumn < 8 ? toColumn + player.relativeDirection(1) : null;
    if (rowAhead) {
      if (columnLeft) {
        move.forwardLeft = (rowAhead - 1) * 8 + (columnLeft - 1);
      }
      if (move.columnRight) {
        move.forwardRight = (rowAhead - 1) * 8 + (columnRight - 1);
      }
    }
    if (rowBehind) {
      if (columnLeft) {
        move.backwardLeft = (rowBehind - 1) * 8 + (columnLeft - 1);
      }
      if (move.columnRight) {
        move.backwardRight = (rowBehind - 1) * 8 + (columnRight - 1);
      }
    }
  }

  getMoveDetails(column, row, pieceMap, rowDir) {
    const destinationId = column + row * 8;
    const destinationPiece = pieceMap[destinationId];
    const isCapture = destinationPiece && (destinationPiece.owner != this.owner);
    const forwards = this.owner.relativeDirection(rowDir) == 1;
    let projectable = this.constructor.moveDescriptor.projectable;
    (typeof projectable == 'function') && (projectable = projectable(this.getRank()));
    return {destinationId, destinationPiece, isCapture, forwards, projectable};
  }

  afterMove(destination) {
    this.hasMoved = true;
  }

  isOnBoard(column, row) {
    return (0 <= column) && (column <= 7) && (0 <= row) && (row <= 7);
  }
}

export default Piece;
