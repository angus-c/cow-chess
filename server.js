var express = require('express');
var app = express();
var path = require('path');
var nextMove = require('./src/server/nextMove');

app.use(express.static('.'));
app.use(express.static('dist-client'));

app.get('/test', (req, res) => {
  res.send('test ok');
});

app.post('/nextMove', (req, res) => {
  var payload = req.body; // <- parse this
  nextMove(payload.player, payload.position);
});

app.listen(3000);
console.log('chess listening on 3000');

module.exports = app;
