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

var King = function (_Piece) {
  _inherits(King, _Piece);

  function King() {
    _classCallCheck(this, King);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(King).apply(this, arguments));
  }

  _createClass(King, [{
    key: 'getValue',
    value: function getValue() {
      return Number.INFINITY;
    }
  }]);

  return King;
}(_Piece3.default);

King.symbol = 'k';
King.classStub = 'king';
King.moveDescriptor = {
  diagonal: true,
  cardinal: true
};
exports.default = King;
//# sourceMappingURL=King.js.map