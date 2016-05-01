'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _nextMove = require('./brain/nextMove');

var _nextMove2 = _interopRequireDefault(_nextMove);

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

require('source-map-support').install();

/* eslint-disable new-cap */
app.game = new _Game2.default();
/* eslint-enable new-cap */

var port = 3000;

app.config = {
  probeDepth: 4,
  cutOffDepth: 3,
  cutOffProportion: 0.5
};

app.use(_express2.default.static('.'));
app.use(_express2.default.static('dist-client'));
app.use(_bodyParser2.default.json());

app.get('/test', function (req, res) {
  res.send('test ok');
});

app.post('/config', function (req, res) {
  // TODO: fix assignment, error handling
  app.config = _extends({}, req.body);
  res.sendStatus(200);
});

app.post('/sendMove', function (req, res) {
  res.sendStatus(app.game.updatePosition(req.body.move));
});

app.get('/generateMove', function (req, res) {
  // TODO: error handling
  res.send(JSON.stringify((0, _nextMove2.default)()));
});

app.listen(port);
console.log('chess listening on', port);

module.exports = app;
//# sourceMappingURL=server.js.map