import EventEmitter from 'event-emitter';

import north from '../modules/players/north';
import south from '../modules/players/south';

import Pawn from '../modules/pieces/Pawn';
import Rook from '../modules/pieces/Rook';
import Knight from '../modules/pieces/Knight';
import Bishop from '../modules/pieces/Bishop';
import King from '../modules/pieces/King';
import Queen from '../modules/pieces/Queen';


const COLORS = ['#FFF', '#000'];
const [R, N, B, K, Q, P] = ['R', 'N', 'B', 'K', 'Q', 'P'];
const [r, n, b, k, q, p] = ['r', 'n', 'b', 'k', 'q', 'p'];
const _ = null;
const STARTING_MAP = [
  r,n,b,q,k,b,n,r,
  p,p,p,p,_,p,p,p,
  _,_,_,_,p,_,_,_,
  _,_,_,_,_,_,_,_,
  _,_,_,P,_,_,_,_,
  _,_,_,_,_,_,P,_,
  P,P,P,_,P,P,_,P,
  R,N,B,Q,K,B,N,R
];
const pieceTypes = {
  p: Pawn,
  r: Rook,
  n: Knight,
  b: Bishop,
  k: King,
  q: Queen
}

class Game {
  constructor() {
    this.state = {
      position: this.instantiatePieces(STARTING_MAP),
      move: 0,
      computerColor: COLORS[1]
    }
    south.pieces.forEach(piece => {
      console.log(
        piece.constructor.symbol,
        piece.squareId,
        piece.possibleMoves(this.state.position).map(move => move.toString()));
    });
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

  emitter = EventEmitter({})
  pieces = {
    south: [],
    north: []
  }
}

export default new Game();
