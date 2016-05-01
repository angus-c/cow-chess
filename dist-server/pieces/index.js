'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (symbol) {
  return symbolLookup[symbol.toLowerCase];
};

var _bishop = require('./bishop');

var _bishop2 = _interopRequireDefault(_bishop);

var _king = require('./king');

var _king2 = _interopRequireDefault(_king);

var _knight = require('./knight');

var _knight2 = _interopRequireDefault(_knight);

var _pawn = require('./pawn');

var _pawn2 = _interopRequireDefault(_pawn);

var _queen = require('./queen');

var _queen2 = _interopRequireDefault(_queen);

var _rook = require('./rook');

var _rook2 = _interopRequireDefault(_rook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbolLookup = {
  'b': _bishop2.default,
  'k': _king2.default,
  'n': _knight2.default,
  'p': _pawn2.default,
  'q': _queen2.default,
  'r': _rook2.default
};
//# sourceMappingURL=index.js.map