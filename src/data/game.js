import EventEmitter from 'event-emitter';

import computer from '../modules/players/computer';
import human from '../modules/players/human';

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
  [r,n,b,k,q,b,n,r],
  [p,p,p,p,p,p,p,p],
  [_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_],
  [P,P,P,P,P,P,P,P],
  [R,N,B,K,Q,B,N,R]
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
    console.log(human.pieces[0].possibleMoves(this.state.position));
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
    return map.map((row, rowNumber) => {
      return row.map((symbol, columnNumber) => {
        if (!symbol) {
          return null;
        }
        const player = (symbol == symbol.toLowerCase()) ? computer : human;
        PieceType = pieceTypes[symbol.toLowerCase()];
        const piece = new PieceType(columnNumber + 1, rowNumber + 1, player);
        player.pieces.push(piece);
        return piece;
      });
    });
  }

  emitter = EventEmitter({})
  pieces = {
    human: [],
    computer: []
  }
}

export default new Game();
