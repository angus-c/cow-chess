/*
  perf ideas
  ----------
  - cache known best moves per position
  - don't cache after arbitrary cache size reached
*/

import EventEmitter from 'event-emitter';

import north from '../modules/players/north';
import south from '../modules/players/south';

import Pawn from '../modules/pieces/Pawn';
import Rook from '../modules/pieces/Rook';
import Knight from '../modules/pieces/Knight';
import Bishop from '../modules/pieces/Bishop';
import King from '../modules/pieces/King';
import Queen from '../modules/pieces/Queen';

// import nextMove from '../modules/nextMove';

const COLORS = ['white', 'black'];
const UNICODE_OFFSET = 65;

const [R, N, B, K, Q, P] = ['R', 'N', 'B', 'K', 'Q', 'P'];
const [r, n, b, k, q, p] = ['r', 'n', 'b', 'k', 'q', 'p'];
const _ = null;

/*eslint-disable */
const STARTING_MAP = [
  r,n,b,q,k,b,n,r,
  p,p,p,p,p,p,p,p,
  _,_,_,_,_,_,_,_,
  _,_,_,_,_,_,_,_,
  _,_,_,_,_,_,_,_,
  _,_,_,_,_,_,_,_,
  P,P,P,P,P,P,P,P,
  R,N,B,Q,K,B,N,R
];
// const STARTING_MAP = [
//   _,_,_,_,_,_,_,_,
//   _,_,_,_,_,_,_,_,
//   _,_,_,_,_,_,_,n,
//   n,_,_,_,_,_,_,_,
//   _,_,_,_,_,_,_,_,
//   _,_,_,_,_,_,_,_,
//   _,_,_,_,_,_,R,_,
//   _,_,B,_,_,_,_,_,
// ];
/*eslint-enable */

const pieceTypes = {
  p: Pawn,
  r: Rook,
  n: Knight,
  b: Bishop,
  k: King,
  q: Queen
};

class Game {
  constructor() {
    this.players = [north, south];
    south.color = COLORS[0];
    north.color = COLORS[1];

    this.state = {
      nextPlayer: this.players.filter(player => player.color == COLORS[0])[0],
      position: this.instantiatePieces(STARTING_MAP),
      moves: [],
      selectedSquare: null,
      config: {
        probeDepth: 4,
        cutOffDepth: 3,
        cutOffProportion: 0.5
      }
    };

    // // autoplay test
    // let nextPlayer = south, moves = 0;
    // const play = setInterval(() => {
    //   this.generateMove(nextPlayer);
    //   nextPlayer = (nextPlayer == south) ? north : south;
    //   moves++;
    //   if (moves > 10) {
    //     window.clearInterval(play);
    //   }
    // }, 1000);
  }

  get() {
    return this.state;
  }

  set(updates) {
    this.state = Object.assign({}, this.state, updates);
    this.emitter.emit('gameChange', this.state);
  }

  getOtherPlayer(player) {
    return player == this.players[0] ? this.players[1] : this.players[0];
  }

  instantiatePieces(map) {
    let PieceType;
    // squeareIds range from 0 (NW) to 63 (SE)
    const position = map.map((symbol, squareId) => {
      if (!symbol) {
        return null;
      }
      const player = (symbol == symbol.toLowerCase()) ? this.players[0] : this.players[1];
      PieceType = pieceTypes[symbol.toLowerCase()];
      const piece = new PieceType(player);
      return piece;
    });
    position.toStr = map.map((symbol, squareId) => {
      if (!symbol) {
        return null;
      }
      return String.fromCharCode(squareId + UNICODE_OFFSET);
    }).filter(Boolean).join('');
    return position;
  }

  applyMove(move) {
    this.updatePosition(this.state.position, move);
    move.piece = this.state.position[move.to];
    this.state.moves.unshift(move);
    this.state.nextPlayer = this.getOtherPlayer(this.state.nextPlayer);
    this.emitter.emit('gameChange', this.state);
  }

  getMoveDisplayEntities = (move, position) => {
    const from = `${1 + move.from % 8},${1 + Math.floor(move.from / 8)}`;
    const to = `${1 + move.to % 8},${1 + Math.floor(move.to / 8)}`;
    const fromTo = `${from}->${to}`;
    const time = move.time ? `(${Math.floor(move.time / 1000)}s)` : ``;
    const piece = move.piece ? move.piece.constructor.classStub : ``;
    const capturedPiece = move.captures ? move.captures.constructor.classStub : ``;
    const myTextClass = move.player.color;
    const theirTextClass = this.getOtherPlayer(move.player).color;
    return {fromTo, time, piece, capturedPiece, myTextClass, theirTextClass};
  };

  // here be all manner of mutation crimes
  updatePosition(position, move) {
    position[move.to] = position[move.from];
    position[move.from] = null;
    const unicodeFrom = String.fromCharCode(move.from + UNICODE_OFFSET);
    const unicodeTo = String.fromCharCode(move.to + UNICODE_OFFSET);
    position.toStr = position.toStr.replace(unicodeTo, '');
    position.toStr = position.toStr.replace(unicodeFrom, unicodeTo);
  }

  nextPlay() {
    if (this.state.nextPlayer.computer) {
      this.generateMove(this.state.nextPlayer);
    }
  }

  generateMove(player) {
    this.applyMove(nextMove(player, this.state.position));
  }

  manualMove(from, to) {
    // TODO: verify legal move
    const player = this.state.position[from].owner;
    this.applyMove({from, to, player});
  }

  squareSelected(location) {
    const piece = this.state.position[location];
    if (location && !this.state.selectedSquare) {
      if (!piece || piece.owner.computer) {
        // valid piece not selected
        return;
      }
    }
    if (location && this.state.selectedSquare) {
      if (piece && !piece.owner.computer) {
        // clicked own piece as destination - assume they want to move this one instead
      } else {
        const from = this.state.selectedSquare;
        this.state.selectedSquare = null;
        return this.manualMove(from, location);
      }
    }
    this.state.selectedSquare = location;
    this.emitter.emit('gameChange', this.state);
  }

  emitter = EventEmitter({});
}

export default new Game();
