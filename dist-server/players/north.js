'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var north = {
  name: 'north',
  symbolForPlayer: function symbolForPlayer(symbol) {
    return symbol.toLowerCase();
  },
  relativeDirection: function relativeDirection(actualDirection) {
    return actualDirection;
  },

  computer: true /* default */
};

exports.default = north;
//# sourceMappingURL=north.js.map