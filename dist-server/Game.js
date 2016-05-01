'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import nextMove from '../modules/nextMove';

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

    // TODO: move config to DB on server
    this.state = {
      nextPlayer: this.players.filter(function (player) {
        return player.color == COLORS[0];
      })[0],
      position: STARTING_MAP,
      moves: [],
      config: {
        probeDepth: 4,
        cutOffDepth: 3,
        cutOffProportion: 0.5
      }
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
    key: 'get',
    value: function get() {
      return this.state;
    }
  }, {
    key: 'set',
    value: function set(updates) {
      this.state = Object.assign({}, this.state, updates);
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
    key: 'getOtherPlayer',
    value: function getOtherPlayer(player) {
      return player == this.players[0] ? this.players[1] : this.players[0];
    }
  }]);

  return Game;
}();

exports.default = Game;
//# sourceMappingURL=Game.js.map