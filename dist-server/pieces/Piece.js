'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import profiler from '../../utilities/profiler';

// TODO: remove subclass reference


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _south = require('../players/south');

var _south2 = _interopRequireDefault(_south);

var _Pawn = require('./Pawn');

var _Pawn2 = _interopRequireDefault(_Pawn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piece = function () {
  function Piece(player) {
    _classCallCheck(this, Piece);

    this.owner = player;
    this.hasMoved = false;
    // TODO support color switch
    this.color = this.owner.name === _south2.default.name ? 'white' : 'black';
    var classStub = this.constructor.classStub;
    if (classStub) {
      var colorStub = this.color == 'white' ? 'w' : 'b';
      this.className = colorStub + '-' + this.constructor.classStub;
    }
  }

  _createClass(Piece, [{
    key: 'getRank',
    value: function getRank(id) {
      return this.owner === _south2.default ? 8 - Math.floor((id || this.squareId) / 8) : 1 + Math.floor((id || this.squareId) / 8);
    }
  }, {
    key: 'possibleMoves',
    value: function possibleMoves(pieceMap) {
      var moves = [];
      var _constructor$moveDesc = this.constructor.moveDescriptor;
      var diagonal = _constructor$moveDesc.diagonal;
      var cardinal = _constructor$moveDesc.cardinal;
      var knightwards = _constructor$moveDesc.knightwards;

      diagonal && moves.push.apply(moves, _toConsumableArray(this.possibleDiagonalMoves(pieceMap)));
      cardinal && moves.push.apply(moves, _toConsumableArray(this.possibleCardinalMoves(pieceMap)));
      knightwards && moves.push.apply(moves, _toConsumableArray(this.possibleKnightMoves(pieceMap)));
      return moves;
    }
  }, {
    key: 'possibleDiagonalMoves',
    value: function possibleDiagonalMoves(pieceMap) {
      var _this = this;

      var moves = [],
          squareId = void 0;
      [-1, 1].forEach(function (columnDir) {
        [-1, 1].forEach(function (rowDir) {
          squareId = _this.squareId;
          while (squareId += columnDir + rowDir * 8, _this.isOnBoard(squareId, columnDir)) {
            var _getMoveDetails = _this.getMoveDetails(squareId, pieceMap, rowDir);

            var destinationPiece = _getMoveDetails.destinationPiece;
            var isCapture = _getMoveDetails.isCapture;
            var forwards = _getMoveDetails.forwards;
            var projectable = _getMoveDetails.projectable;

            var diagonal = _this.constructor.moveDescriptor.diagonal;
            if (destinationPiece && !isCapture || typeof diagonal == 'function' && !diagonal(isCapture, forwards)) {
              break;
            }
            var move = { from: _this.squareId, to: squareId, player: _this.owner };
            _this.addMoveInfo(move, destinationPiece, pieceMap);
            moves.push(move);
            if (destinationPiece || !projectable) {
              break;
            }
          }
        });
      });
      return moves;
    }
  }, {
    key: 'possibleCardinalMoves',
    value: function possibleCardinalMoves(pieceMap) {
      var _this2 = this;

      var moves = [],
          squareId = void 0;
      [-1, 0, 1].forEach(function (columnDir) {
        [-1, 0, 1].forEach(function (rowDir) {
          if ((columnDir == 0 || rowDir == 0) && columnDir != rowDir) {
            squareId = _this2.squareId;
            while (squareId += columnDir + rowDir * 8, _this2.isOnBoard(squareId, columnDir)) {
              var _getMoveDetails2 = _this2.getMoveDetails(squareId, pieceMap, rowDir);

              var destinationPiece = _getMoveDetails2.destinationPiece;
              var isCapture = _getMoveDetails2.isCapture;
              var forwards = _getMoveDetails2.forwards;
              var projectable = _getMoveDetails2.projectable;

              var cardinal = _this2.constructor.moveDescriptor.cardinal;
              if (destinationPiece && !isCapture || typeof cardinal == 'function' && !cardinal(isCapture, forwards)) {
                break;
              }
              var move = { from: _this2.squareId, to: squareId, player: _this2.owner };
              _this2.addMoveInfo(move, destinationPiece, pieceMap);
              moves.push(move);
              if (destinationPiece || !projectable || _this2 instanceof _Pawn2.default && _this2.getRank(squareId) == 4 /* TODO */
              ) {
                  break;
                }
            }
          }
        });
      });
      return moves;
    }
  }, {
    key: 'possibleKnightMoves',
    value: function possibleKnightMoves(pieceMap) {
      var _this3 = this;

      var squareId = void 0,
          moves = [];
      [-2, -1, 1, 2].forEach(function (columnDir) {
        [-2, -1, 1, 2].forEach(function (rowDir) {
          if (Math.abs(columnDir) + Math.abs(rowDir) == 3) {
            squareId = _this3.squareId + (columnDir + rowDir * 8);
            if (_this3.isOnBoard(squareId, columnDir)) {
              var destinationPiece = pieceMap[squareId];
              if (destinationPiece && destinationPiece.owner === _this3.owner) {
                return;
              }
              var move = { from: _this3.squareId, to: squareId, player: _this3.owner };
              _this3.addMoveInfo(move, destinationPiece, pieceMap);
              moves.push(move);
            }
          }
        });
      });
      return moves;
    }
  }, {
    key: 'addMoveInfo',
    value: function addMoveInfo(move, destinationPiece) {
      if (destinationPiece) {
        move.captures = destinationPiece;
      }
      // const player = move.player;
      // TODO: attach all this to move
      // const toRow = 1 + Math.floor(move.to / 8);
      // const toColumn = 1 + (move.to % 8);
      // const rowAhead = toRow < 8 ? toRow + player.relativeDirection(1) : null;
      // const rowBehind = toRow > 1 ? toRow - player.relativeDirection(1) : null;
      // const columnLeft = toColumn > 1 ? toColumn - player.relativeDirection(1) : null;
      // const columnRight = toColumn < 8 ? toColumn + player.relativeDirection(1) : null;
      // if (rowAhead) {
      //   if (columnLeft) {
      //     move.forwardLeft = (rowAhead - 1) * 8 + (columnLeft - 1);
      //   }
      //   if (move.columnRight) {
      //     move.forwardRight = (rowAhead - 1) * 8 + (columnRight - 1);
      //   }
      // }
      // if (rowBehind) {
      //   if (columnLeft) {
      //     move.backwardLeft = (rowBehind - 1) * 8 + (columnLeft - 1);
      //   }
      //   if (move.columnRight) {
      //     move.backwardRight = (rowBehind - 1) * 8 + (columnRight - 1);
      //   }
      // }
    }
  }, {
    key: 'getMoveDetails',
    value: function getMoveDetails(squareId, pieceMap, rowDir) {
      var destinationPiece = pieceMap[squareId];
      var isCapture = destinationPiece && destinationPiece.owner != this.owner;
      var forwards = this.owner.relativeDirection(rowDir) == 1;
      var projectable = this.constructor.moveDescriptor.projectable;
      typeof projectable == 'function' && (projectable = projectable(this.getRank()));
      return { destinationPiece: destinationPiece, isCapture: isCapture, forwards: forwards, projectable: projectable };
    }
  }, {
    key: 'afterMove',
    value: function afterMove(destination) {
      this.hasMoved = true;
    }
  }, {
    key: 'isOnBoard',
    value: function isOnBoard(squareId, colDir) {
      if (squareId < 0 || squareId > 63) {
        return false;
      }
      // check for column wrapping
      if (colDir) {
        var col = squareId % 8;
        if (colDir < 0) {
          return col <= 7 + colDir;
        }
        if (colDir > 0) {
          return col >= 0 + colDir;
        }
      }
      return true;
    }
  }]);

  return Piece;
}();

exports.default = Piece;
//# sourceMappingURL=Piece.js.map