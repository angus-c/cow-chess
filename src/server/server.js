import express from 'express';
import bodyParser from 'body-parser';
import nextMove from './brain/nextMove';
import Game from './Game';

let app = express();

require('source-map-support').install();

/* eslint-disable new-cap */
app.game = new Game();
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

app.get('/board', (req, res) => {
  // TODO: error handling
  res.send(app.game.getBoard());
});

app.post('/sendMove', (req, res) => {
  // TODO: error handling
  res.send(app.game.updatePosition(req.body.move));
  // res.sendStatus(200);
});

app.get('/generateMove', (req, res) => {
  // TODO: error handling
  console.log('######################')
  res.send(JSON.stringify(nextMove()));
});

app.listen(port);
console.log('chess listening on', port);

module.exports = app;
