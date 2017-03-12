// TODO: get rid of client refs
import profiler from '../utilities/profiler';

let movesLookup;

let bestScoreSoFar, originalPlayer, requestedDepth;
// store in closure scope because passing it through recursion is hella messy
let currentRecursionScore;

function nextMove(game) {
  const {
    position,
    nextPlayer,
    config: {
      probeDepth,
      cutOffDepth,
      cutOffProportion
    }
  } = game.state;
  bestScoreSoFar = Number.NEGATIVE_INFINITY;
  movesLookup = {
    north: {},
    south: {}
  };
  originalPlayer = nextPlayer;
  requestedDepth = probeDepth;
  const moveTime = profiler('moveTime');
  const firstPass = getSortedMoves(originalPlayer, position, cutOffDepth);
  const shortlist = firstPass.slice(0, firstPass.length * cutOffProportion);
  const move = getSortedMoves(originalPlayer, position, requestedDepth, shortlist)[0];
  move.time = moveTime.getElapsed();
  return move;

  function getSortedMoves(player, position, depth, possibleMoves) {
    !possibleMoves && (possibleMoves = getAllPossibleMoves(player, position));
    const scoredMoves = possibleMoves.map(move => {
      // excuse the side effects
      if (depth == requestedDepth) {
        // initialize score for this move drill-down
        currentRecursionScore = 0;
      }
      const score = deepScore(move, position, depth);
      if (depth == requestedDepth) {
        // update top level best score
        (score > bestScoreSoFar) && (bestScoreSoFar = score);
      }
      move.score = score;
      return move;
    });
    return scoredMoves.sort(
      (a, b) => a.score < b.score ? 1 : -1);
  }

  function getAllPossibleMoves(player, position) {
    const savedMoves = movesLookup[player][position];
    if (savedMoves) {
      return savedMoves;
    }
    const moves = position.reduce((moves, symbol) => {
      if (isMyPiece(player, symbol)) {
        moves.push(...getPossibleMoves(pieces(symbol), player));
      }
      return moves;
    }, []);

    movesLookup[player.name][position.toStr] = moves;
    return moves;
  }

  function deepScore(move, position, depth) {
    let counterScore = 0, sortedReplies;
    // TODO: cache this?
    const shallowScore = score(move, position, depth);
    if (move.player === originalPlayer) {
      currentRecursionScore += shallowScore;
    } else {
      currentRecursionScore -= shallowScore;
    }
    if (depth > 0) {
      const giveIn =
        (move.player == originalPlayer) &&
        (depth != requestedDepth) &&
        (currentRecursionScore < bestScoreSoFar);
      if (!giveIn) {
        sortedReplies = getSortedMoves(
          game.getOtherPlayer(move.player),
          simulateMove(move, position),
          depth - 1
        );
        move.numberOfReplies = sortedReplies.length;
        move.bestReply = sortedReplies[0];
        counterScore = sortedReplies[0] ? sortedReplies[0].score : 0;
      }
    }
    const thisScore = shallowScore - counterScore;
    return thisScore;
  }

  function score(move, position, depth) {
    let score = 1;
    const {player, captures, forwardLeft, forwardRight, backwardLeft, backwardRight} = move;

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
    const tempPosition = [...position];
    tempPosition.toStr = position.toStr;
    game.updatePosition(tempPosition, move);
    return tempPosition;
  }

  function isMyPiece(player, symbol) {
    return (symbol != '.') && (symbol[player.case]() == symbol);
  }

  function getPossibleMoves(piece, player) {
    const moves = [];
    const {diagonal, cardinal, knightwards} = piece.moveDescriptor;
    diagonal && moves.push(...piece.possibleDiagonalMoves(position));
    cardinal && moves.push(...piece.possibleCardinalMoves(position));
    knightwards && moves.push(...piece.possibleKnightMoves(position));
    return moves;
  }
}

export default nextMove;
