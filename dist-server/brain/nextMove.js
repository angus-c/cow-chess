'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _profiler = require('../utilities/profiler');

var _profiler2 = _interopRequireDefault(_profiler);

var _pieces = require('../pieces');

var _pieces2 = _interopRequireDefault(_pieces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // TODO: get rid of client refs


var movesLookup = void 0;

var bestScoreSoFar = void 0,
    originalPlayer = void 0,
    requestedDepth = void 0;
// store in closure scope because passing it through recursion is hella messy
var currentRecursionScore = void 0;

function nextMove(game) {
  var _game$state = game.state;
  var position = _game$state.position;
  var nextPlayer = _game$state.nextPlayer;
  var _game$state$config = _game$state.config;
  var probeDepth = _game$state$config.probeDepth;
  var cutOffDepth = _game$state$config.cutOffDepth;
  var cutOffProportion = _game$state$config.cutOffProportion;

  bestScoreSoFar = Number.NEGATIVE_INFINITY;
  movesLookup = {
    north: {},
    south: {}
  };
  originalPlayer = nextPlayer;
  requestedDepth = probeDepth;
  var moveTime = (0, _profiler2.default)('moveTime');
  var firstPass = getSortedMoves(originalPlayer, position, cutOffDepth);
  var shortlist = firstPass.slice(0, firstPass.length * cutOffProportion);
  var move = getSortedMoves(originalPlayer, position, requestedDepth, shortlist)[0];
  move.time = moveTime.getElapsed();
  return move;

  function getSortedMoves(player, position, depth, possibleMoves) {
    !possibleMoves && (possibleMoves = getAllPossibleMoves(player, position));
    var scoredMoves = possibleMoves.map(function (move) {
      // excuse the side effects
      if (depth == requestedDepth) {
        // initialize score for this move drill-down
        currentRecursionScore = 0;
      }
      var score = deepScore(move, position, depth);
      if (depth == requestedDepth) {
        // update top level best score
        score > bestScoreSoFar && (bestScoreSoFar = score);
      }
      move.score = score;
      return move;
    });
    return scoredMoves.sort(function (a, b) {
      return a.score < b.score ? 1 : -1;
    });
  }

  function getAllPossibleMoves(player, position) {
    var savedMoves = movesLookup[player][position];
    if (savedMoves) {
      return savedMoves;
    }
    var moves = position.reduce(function (moves, symbol) {
      if (isMyPiece(player, symbol)) {
        moves.push.apply(moves, _toConsumableArray(getPossibleMoves((0, _pieces2.default)(symbol), player)));
      }
      return moves;
    }, []);

    movesLookup[player.name][position.toStr] = moves;
    return moves;
  }

  function deepScore(move, position, depth) {
    var counterScore = 0,
        sortedReplies = void 0;
    // TODO: cache this?
    var shallowScore = score(move, position, depth);
    if (move.player === originalPlayer) {
      currentRecursionScore += shallowScore;
    } else {
      currentRecursionScore -= shallowScore;
    }
    if (depth > 0) {
      var giveIn = move.player == originalPlayer && depth != requestedDepth && currentRecursionScore < bestScoreSoFar;
      if (!giveIn) {
        sortedReplies = getSortedMoves(game.getOtherPlayer(move.player), simulateMove(move, position), depth - 1);
        move.numberOfReplies = sortedReplies.length;
        move.bestReply = sortedReplies[0];
        counterScore = sortedReplies[0] ? sortedReplies[0].score : 0;
      }
    }
    var thisScore = shallowScore - counterScore;
    return thisScore;
  }

  function score(move, position, depth) {
    var score = 1;
    var player = move.player;
    var captures = move.captures;
    var forwardLeft = move.forwardLeft;
    var forwardRight = move.forwardRight;
    var backwardLeft = move.backwardLeft;
    var backwardRight = move.backwardRight;

    // piece capture

    if (captures) {
      score += captures.getValue();
    }

    // number of possible replies
    score -= (move.numberOfReplies || 0) / 10;

    // pawn support
    // if (position[move.from] instanceof Pawn) {
    //   if (position[forwardLeft] && (position[forwardLeft].owner === player)) {
    //     score += 1;
    //   }
    //   if (position[forwardRight] && (position[forwardRight].owner === player)) {
    //     score += 1;
    //   }
    // }
    // if (
    //   position[backwardLeft] &&
    //   (position[backwardLeft] instanceof Pawn) &&
    //   (position[backwardLeft].owner === player)) {
    //     score += 1;
    // }
    // if (
    //   position[backwardRight] &&
    //   (position[backwardRight] instanceof Pawn) &&
    //   (position[backwardRight].owner === player)) {
    //     score += 1;
    // }

    return score;
  }

  function simulateMove(move, position) {
    var tempPosition = [].concat(_toConsumableArray(position));
    tempPosition.toStr = position.toStr;
    game.updatePosition(tempPosition, move);
    return tempPosition;
  }

  function isMyPiece(player, symbol) {
    return symbol != '.' && symbol[player.case]() == symbol;
  }

  function getPossibleMoves(piece, player) {
    var moves = [];
    var _piece$moveDescriptor = piece.moveDescriptor;
    var diagonal = _piece$moveDescriptor.diagonal;
    var cardinal = _piece$moveDescriptor.cardinal;
    var knightwards = _piece$moveDescriptor.knightwards;

    diagonal && moves.push.apply(moves, _toConsumableArray(this.possibleDiagonalMoves(position)));
    cardinal && moves.push.apply(moves, _toConsumableArray(this.possibleCardinalMoves(position)));
    knightwards && moves.push.apply(moves, _toConsumableArray(this.possibleKnightMoves(position)));
    return moves;
  }
}

exports.default = nextMove;
//# sourceMappingURL=nextMove.js.map