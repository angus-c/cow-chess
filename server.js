var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nextMove = require('./src/server/nextMove').default;
require('source-map-support').install();

app.use(express.static('.'));
app.use(express.static('dist-client'));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
  res.send('test ok');
});

app.post('/nextMove', (req, res) => {
  var payload = req.body;
  res.send(JSON.stringify(nextMove(payload.player, payload.position)));
});

app.listen(3000);
console.log('chess listening on 3000');

module.exports = app;
