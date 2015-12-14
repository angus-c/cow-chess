import EventEmitter from 'event-emitter';

import north from '../modules/players/north';
import south from '../modules/players/south';

import Pawn from '../modules/pieces/Pawn';
import Rook from '../modules/pieces/Rook';
import Knight from '../modules/pieces/Knight';
import Bishop from '../modules/pieces/Bishop';
import King from '../modules/pieces/King';
import Queen from '../modules/pieces/Queen';

import nextMove from '../modules/nextMove';

const COLORS = ['#FFF', '#000'];
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
    this.state = {
      position: this.instantiatePieces(STARTING_MAP),
      move: 0,
      computerColor: COLORS[1]
    };
    south.pieces.forEach(piece => {
      console.log(
        piece.constructor.symbol,
        piece.squareId,
        piece.possibleMoves(this.state.position).map(move => move.toString()));
    });

    // autoplay test
    let nextPlayer = south, moves = 0;
    const play = setInterval(() => {
      this.generateMove(nextPlayer);
      nextPlayer = (nextPlayer == south) ? north : south;
      moves++;
      if (moves > 10) {
        window.clearInterval(play);
      }
    }, 1000);
  }

  get() {
    return this.state;
  }

  set(updates) {
    this.state = Object.assign({}, this.state, updates);
    this.emitter.emit('gameChange', this.state);
  }

  instantiatePieces(map) {
    let PieceType;
    // squeareIds range from 0 (NW) to 63 (SE)
    return map.map((symbol, squareId) => {
      if (!symbol) {
        return null;
      }
      const player = (symbol == symbol.toLowerCase()) ? north : south;
      PieceType = pieceTypes[symbol.toLowerCase()];
      const piece = new PieceType(squareId, player);
      player.pieces.push(piece);
      return piece;
    });
  }

  applyMove(move) {
    const position = this.state.position;
    if (position[move.to]) {
      // TODO: capture
    }
    position[move.to] = position[move.from];
    position[move.from] = null;
    this.emitter.emit('gameChange', this.state);
  }

  generateMove(player) {
    this.applyMove(nextMove(this.state.position, player));
  }

  emitter = EventEmitter({})
  pieces = {
    south: [],
    north: []
  }
}

export default new Game();
