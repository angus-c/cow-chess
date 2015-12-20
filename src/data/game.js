/*
  perf ideas
  ----------
  - cache known best moves per position
  - cache key only represents moved pieces
  -- position is base 64 character
  - make position a simple hash, move methods to closure scope
  - make move a simple hash
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

import Move from '../modules/Move';
import nextMove from '../modules/nextMove';

const PROBE_DEPTH = 4;
const COLORS = ['#FFF', '#000'];
const UNICODE_OFFSET = 161;

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
      position: this.instantiatePieces(STARTING_MAP),
      moves: [],
      selectedSquare: null
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
      return symbol + String.fromCharCode(squareId + UNICODE_OFFSET);
    }).filter(Boolean).join('');
    return position;
  }

  applyMove(move) {
    this.updatePosition(this.state.position, move);
    this.state.moves.unshift(move);
    this.emitter.emit('gameChange', this.state);
  }

  // here be all manner of mutation crimes
  updatePosition(position, move) {
    position[move.to] = position[move.from];
    position[move.from] = null;
    const unicodeFrom = String.fromCharCode(move.from + UNICODE_OFFSET);
    const unicodeTo = String.fromCharCode(move.to + UNICODE_OFFSET);
    position.toStr = position.toStr.replace(unicodeTo, '');
    position.toStr = position.toStr.replace(unicodeFrom, unicodeTo);
  }

  generateMove(player) {
    // TODO: tighten up syntax
    this.applyMove(nextMove(player, this.state.position, PROBE_DEPTH));
  }

  manualMove(from, to) {
    // TODO: verify legal move
    const player = this.state.position[from].owner;
    this.applyMove(new Move(from, to, player));
    // computer move
    this.generateMove(this.getOtherPlayer(player));
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

  emitter = EventEmitter({})
}

export default new Game();
