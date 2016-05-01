"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  moveDescriptor: {
    diagonal: function diagonal(isCapture, forwards) {
      return isCapture && forwards;
    },
    cardinal: function cardinal(isCapture, forwards) {
      return !isCapture && forwards;
    },
    projectable: function projectable(rank) {
      return rank == 2;
    }
  },
  getValue: function getValue() {
    return 1;
  }
};
//# sourceMappingURL=pawn.js.map