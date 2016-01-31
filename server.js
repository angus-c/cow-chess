var express = require('express');
var app = express();
var path = require('path');


// revisit for security
app.use('/', express.static(__dirname + '/'));

//
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

app.get('/test', function(req, res) {
  res.send('test ok');
});

app.listen(3000);
console.log('chess listening on 3000');

module.exports = app;
