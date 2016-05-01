"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (id) {
  var start = Date.now();
  return {
    stop: function stop() {
      return console.log(id, Date.now() - start);
    },
    getElapsed: function getElapsed() {
      return Date.now() - start;
    }
  };
};
//# sourceMappingURL=profiler.js.map