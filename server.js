var express = require('express');
var app = express();
var path = require('path');

app.use('/', express.static(__dirname + '/bundle/'));
app.use('bundle/images', express.static(__dirname + '/bundle/images/'));

app.get('/test', function(req, res) {
  res.send('test ok');
});

app.listen(3000);
console.log('chess listening on 3000');

module.exports = app;
