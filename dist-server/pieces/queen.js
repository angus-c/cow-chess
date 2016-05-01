"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  moveDescriptor: {
    diagonal: function diagonal(move) {
      return true;
    },
    cardinal: function cardinal(move) {
      return true;
    },
    projectable: true
  },
  getValue: function getValue() {
    return 10;
  }
};
//# sourceMappingURL=queen.js.map