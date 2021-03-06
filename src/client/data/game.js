/*
  perf ideas
  ----------
  - cache known best moves per position
  - don't cache after arbitrary cache size reached
*/

import EventEmitter from 'event-emitter';

import north from '../modules/players/north';
import south from '../modules/players/south';

import request from 'request';

const COLORS = ['white', 'black'];
// const UNICODE_OFFSET = 65;

export default class Game {
  constructor() {
    this.players = [north, south];
    south.color = COLORS[0];
    north.color = COLORS[1];

    this.setInitialState();
  }

  get() {
    return this.state;
  }

  set(updates) {
    this.state = Object.assign({}, this.state, updates);
    this.emitter.emit('gameChange', this.state);
  }

  getOtherPlayer(player) {
    return this.players[0] === player ? this.players[0] : this.players[1];
  }

  applyMove(move) {
    this.updatePosition(this.state.position, move);
    move.piece = this.state.position[move.to];
    this.state.moves.unshift(move);
    this.state.nextPlayer = this.getOtherPlayer(this.state.nextPlayer);
    this.emitter.emit('gameChange', this.state);
  }

  // Simplify
  getMoveDisplayEntities(move, position) {
    const from = `${1 + move.from % 8},${1 + Math.floor(move.from / 8)}`;
    const to = `${1 + move.to % 8},${1 + Math.floor(move.to / 8)}`;
    const fromTo = `${from}->${to}`;
    const time = move.time ? `(${Math.floor(move.time / 1000)}s)` : ``;
    const piece = move.piece ? move.piece.constructor.classStub : ``;
    const capturedPiece = move.captures ? move.captures.constructor.classStub : ``;
    const player = this.state.position[move.to].owner;
    const myTextClass = player.color;
    const theirTextClass = this.getOtherPlayer(player).color;
    return {fromTo, time, piece, capturedPiece, myTextClass, theirTextClass};
  };

  // here be all manner of mutation crimes
  updatePosition(position, move) {
    position[move.to] = position[move.from];
    position[move.from] = null;
  }

  nextPlay() {
    debugger;
    if (this.state.nextPlayer.computer) {
      this.fetchMove(this.state.nextPlayer);
    }
  }

  setInitialState() {
    this.set({
      loading: true
    });
    // TODO: derive URL domain
    request({
      method: 'get',
      url: 'http://localhost:3000/board',
      json: true
    },
    (err, resp) => {
      if (err) {
        throw new Error(err);
      } else {
        const {nextPlayer, position} = resp.body;
        this.set({
          loading: false,
          nextPlayer,
          position,
          moves: [],
          selectedSquare: null
        });
      }
    });
  }

  fetchMove(player) {
    // TODO: derive URL domain
    request({
      method: 'get',
      url: 'http://localhost:3000/generateMove'
    },
    (err, data) => {
      if (err) {
        throw new Error(err);
      } else {
        this.applyMove(data);
      }
    });
  }

  sendMove(move) {
    // TODO: derive URL domain
    request({
      method: 'post',
      json: true,
      url: 'http://localhost:3000/sendMove',
      body: {move}
    },
    (err, data) => {
      if (err) {
        throw new Error(err);
      } else {
        // this.applyMove(data);
      }
    });
  }

  manualMove(from, to) {
    // TODO: verify legal move
    this.applyMove({from, to});
    this.sendMove({from, to});
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
