'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Pawn = require('./pieces/Pawn');

var _Pawn2 = _interopRequireDefault(_Pawn);

var _Rook = require('./pieces/Rook');

var _Rook2 = _interopRequireDefault(_Rook);

var _Knight = require('./pieces/Knight');

var _Knight2 = _interopRequireDefault(_Knight);

var _Bishop = require('./pieces/Bishop');

var _Bishop2 = _interopRequireDefault(_Bishop);

var _King = require('./pieces/King');

var _King2 = _interopRequireDefault(_King);

var _Queen = require('./pieces/Queen');

var _Queen2 = _interopRequireDefault(_Queen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var COLORS = ['white', 'black'];
var UNICODE_OFFSET = 65;

var R = 'R';
var N = 'N';
var B = 'B';
var K = 'K';
var Q = 'Q';
var P = 'P';
var r = 'r';
var n = 'n';
var b = 'b';
var k = 'k';
var q = 'q';
var p = 'p';

var _ = null;

/*eslint-disable */
var STARTING_MAP = [r, n, b, q, k, b, n, r, p, p, p, p, p, p, p, p, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, P, P, P, P, P, P, P, P, R, N, B, Q, K, B, N, R];
// const STARTING_MAP = [
//   _,_,_,_,_,_,_,_,
//   _,_,_,_,_,_,_,_,
//   _,_,_,_,_,_,_,n,
//   n,_,_,_,_,_,_,_,
//   _,_,_,_,_,_,_,_,
//   _,_,_,_,_,_,_,_,
//   _,_,_,_,_,_,R,_,
//   _,_,B,_,_,_,_,_,
// ];
/*eslint-enable */

var pieceTypes = {
  p: _Pawn2.default,
  r: _Rook2.default,
  n: _Knight2.default,
  b: _Bishop2.default,
  k: _King2.default,
  q: _Queen2.default
};

// players
var north = {
  name: 'north',
  case: 'toLowerCase',
  relativeDirection: function relativeDirection(actualDirection) {
    return actualDirection;
  }
};

var south = {
  name: 'south',
  case: 'toUpperCase',
  relativeDirection: function relativeDirection(actualDirection) {
    return actualDirection;
  }
};

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.players = [north, south];
    south.color = COLORS[0];
    north.color = COLORS[1];

    this.state = {
      nextPlayer: this.players.filter(function (player) {
        return player.color == COLORS[0];
      })[0],
      position: this.instantiatePieces(STARTING_MAP),
      moves: []
    };

    // // autoplay test
    // let nextPlayer = south, moves = 0;
    // const play = setInterval(() => {
    //   this.generateMove(nextPlayer);
    //   nextPlayer = (nextPlayer == south) ? north : south;
    //   moves++;
    //   if (moves > 10) {
    //     window.clearInterval(play);
    //   }
    // }, 1000);
  }

  _createClass(Game, [{
    key: 'getBoard',
    value: function getBoard() {
      return _extends({}, this.state);
    }
  }, {
    key: 'updatePosition',
    value: function updatePosition(move) {
      var position = _extends({}, this.state.position);
      position[move.to] = position[move.from];
      position[move.from] = null;
      this.set({ position: position });
    }
  }, {
    key: 'instantiatePieces',
    value: function instantiatePieces(map) {
      var _this = this;

      var PieceType = void 0;
      // squareIds range from 0 (NW) to 63 (SE)
      var position = map.map(function (symbol, squareId) {
        if (!symbol) {
          return null;
        }
        var player = symbol == symbol.toLowerCase() ? _this.players[0] : _this.players[1];
        PieceType = pieceTypes[symbol.toLowerCase()];
        var piece = new PieceType(player);
        return piece;
      });
      position.toStr = map.map(function (symbol, squareId) {
        if (!symbol) {
          return null;
        }
        return String.fromCharCode(squareId + UNICODE_OFFSET);
      }).filter(Boolean).join('');
      return position;
    }
  }, {
    key: 'getOtherPlayer',
    value: function getOtherPlayer(player) {
      return player == this.players[0] ? this.players[1] : this.players[0];
    }
  }]);

  return Game;
}();

exports.default = Game;
//# sourceMappingURL=Game.js.map