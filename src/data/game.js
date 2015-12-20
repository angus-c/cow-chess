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
import Position from '../modules/Position';
import nextMove from '../modules/nextMove';

const PROBE_DEPTH = 4;
const COLORS = ['#FFF', '#000'];

/*eslint-disable */
const STARTING_MAP = `rbbqkbbrpppppppp________________________________PPPPPPPPRBBQKBBR`;
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
      position: new Position(STARTING_MAP, pieceTypes, this.players),
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

  applyMove(move) {
    this.state.position.applyMove(move);
    this.state.moves.unshift(move);
    this.emitter.emit('gameChange', this.state);
  }

  generateMove(player) {
    // TODO: tighten up syntax
    this.applyMove(nextMove(player, this.state.position, PROBE_DEPTH));
  }

  manualMove(from, to) {
    // TODO: verify legal move
    const player = this.state.position.pieceMap[from].owner;
    this.applyMove(new Move(from, to, player));
    // computer move
    this.generateMove(this.getOtherPlayer(player));
  }

  squareSelected(location) {
    const piece = this.state.position.pieceMap[location];
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
