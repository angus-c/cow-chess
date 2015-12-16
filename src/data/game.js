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
      moves: [],
      selectedSquare: null
    };
    south.color = COLORS[0];
    north.color = COLORS[1];
    north.pieces.forEach(piece => {
      console.log(
        piece.constructor.classStub,
        piece.getRank(),
        piece.squareId,
        piece.possibleMoves(this.state.position).map(move => move.toString()));
    });

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
      const otherPlayer = position[move.to].owner;
      otherPlayer.pieces = otherPlayer.pieces.filter(piece => piece != position[move.to]);
    }
    position[move.to] = position[move.from];
    position[move.from] = null;
    position[move.to].afterMove(move.to);
    this.state.moves.unshift(move);
    this.emitter.emit('gameChange', this.state);
  }

  generateMove(player) {
    this.applyMove(nextMove(player, this.state.position));
  }

  manualMove(from, to) {
    // TODO: verify legal move
    const player = this.state.position[from].owner;
    this.applyMove(new Move(from, to, player));
    // computer move
    this.generateMove(player.owner == north ? south : north);
  }

  squareSelected(location) {
    const piece = this.state.position[location];
    piece && console.log(piece, piece.possibleMoves(this.state.position));
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
  pieces = {
    south: [],
    north: []
  }
}

export default new Game();
