var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nextMove = require('./src/server/nextMove').default;
require('source-map-support').install();

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
  // TODO: fix assignment, error check
  app.config = {...req.body};
  res.sendStatus(200);
});

app.post('/nextMove', (req, res) => {
  var payload = req.body;
  res.send(JSON.stringify(nextMove(payload.player, payload.position)));
});

app.listen(3000);
console.log('chess listening on 3000');

module.exports = app;
