var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nextMove = require('./src/server/brain/nextMove').default;

require('source-map-support').install();

/* eslint-disable new-cap */
app.game = new require('./src/server/Game').default();
/* eslint-enable new-cap */

var port = 3000;

app.config = {
  probeDepth: 4,
  cutOffDepth: 3,
  cutOffProportion: 0.5
};

app.use(express.static('.'));
app.use(express.static('dist-client'));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
  res.send('test ok');
});

app.post('/config', (req, res) => {
  // TODO: fix assignment, error handling
  app.config = {...req.body};
  res.sendStatus(200);
});

app.post('/sendMove', (req, res) => {
  res.sendStatus(app.game.updatePosition(req.body.move));
});

app.get('/generateMove', (req, res) => {
  // TODO: error handling
  res.send(JSON.stringify(nextMove()));
});

app.listen(port);
console.log('chess listening on', port);

module.exports = app;
