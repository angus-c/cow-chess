'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Piece2 = require('./Piece');

var _Piece3 = _interopRequireDefault(_Piece2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pawn = function (_Piece) {
  _inherits(Pawn, _Piece);

  function Pawn() {
    _classCallCheck(this, Pawn);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Pawn).apply(this, arguments));
  }

  _createClass(Pawn, [{
    key: 'getValue',
    value: function getValue() {
      return 1;
    }
  }]);

  return Pawn;
}(_Piece3.default);

Pawn.symbol = 'p';
Pawn.classStub = 'pawn';
Pawn.moveDescriptor = {
  diagonal: function diagonal(isCapture, forwards) {
    return isCapture && forwards;
  },
  cardinal: function cardinal(isCapture, forwards) {
    return !isCapture && forwards;
  },
  projectable: function projectable(rank) {
    return rank == 2;
  }
};
exports.default = Pawn;
//# sourceMappingURL=Pawn.js.map