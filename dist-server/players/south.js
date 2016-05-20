'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var south = {
  name: 'south',
  symbolForPlayer: function symbolForPlayer(symbol) {
    return symbol.toUpperCase();
  },
  relativeDirection: function relativeDirection(actualDirection) {
    return -actualDirection;
  },

  computer: false /* default */
};

exports.default = south;
//# sourceMappingURL=south.js.map