import game from '../data/game';
import profiler from '../utilities/profiler';

let bestMoveLookup;
let possibleMovesLookup;

let bestScoreSoFar = -100, originalPlayer, requestedDepth;

const nextMove = (player, position, depth) => {
  bestMoveLookup = {};
  for (let thisDepth = 0; thisDepth <= depth; thisDepth++) {
    bestMoveLookup[thisDepth] = {
      north: {}, south: {}
    };
  }
  possibleMovesLookup = {north: {}, south: {}};
  originalPlayer = player;
  requestedDepth = depth;
  const timeForNextMove = profiler('timeForNextMove');
  let move;
  move = bestMoveLookup[depth][player.name][position.toStr];
  if (move) {
    timeForNextMove.stop();
    return move;
  }
  move = getSortedMoves(player, position, depth)[0];
  bestMoveLookup[depth][player.name][position.toStr] = move;
  timeForNextMove.stop();
  return move;
};

const getSortedMoves = (player, position, depth) => {
  const scoredMoves = getPossibleMoves(player, position).map(move => {
    move.score = deepScore(move, position, depth);
    return move;
  });
  return scoredMoves.sort(
    (a, b) => a.score < b.score ? 1 : -1);
};

const getPossibleMoves = (player, position) => {
  const savedMoves = possibleMovesLookup[player.name][position.toStr];
  if (savedMoves) {
    return savedMoves;
  }
  const moves = position.reduce((moves, sq, id) => {
    if (sq && sq.owner == player) {
      sq.squareId = id;
      moves.push(...sq.possibleMoves(position));
    }
    return moves;
  }, []);

  possibleMovesLookup[player.name][position.toStr] = moves;
  return moves;
};

const deepScore = (move, position, depth) => {
  let counterScore = 0;
  if (depth > 0) {
    const newPosition = simulateMove(move, position);
    const nextDepth = depth - 1;
    const nextPlayer = game.getOtherPlayer(move.player);
    const cachedBestReply = bestMoveLookup[nextDepth][nextPlayer.name][newPosition.toStr];
    const bestReply = cachedBestReply || getSortedMoves(nextPlayer, newPosition, nextDepth)[0];
    move.bestReply = bestReply;
    if (!cachedBestReply) {
      bestMoveLookup[nextDepth][nextPlayer.name][newPosition.toStr] = bestReply;
    }
    counterScore = bestReply ? bestReply.score : 0;
  }
  const thisScore = score(move, depth) - counterScore;
  return thisScore;
};

const score = (move, depth) => {
  let score = 1;
  move.captures && (score += move.captures.getValue());
  return score;
};

const simulateMove = (move, position) => {
  const tempPosition = [...position];
  tempPosition.toStr = position.toStr;
  game.updatePosition(tempPosition, move);
  return tempPosition;
};

export default nextMove;
