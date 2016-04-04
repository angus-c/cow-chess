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

// players
const north = {
  name: 'north',
  case: 'toLowerCase',
  relativeDirection(actualDirection) {
    return actualDirection;
  }
};

const south = {
  name: 'south',
  case: 'toUpperCase',
  relativeDirection(actualDirection) {
    return actualDirection;
  }
};

export default class Game {
  constructor() {
    this.players = [north, south];
    south.color = COLORS[0];
    north.color = COLORS[1];

    // TODO: move config to DB on server
    this.state = {
      nextPlayer: this.players.filter(player => player.color == COLORS[0])[0],
      position: STARTING_MAP,
      moves: [],
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
  }

  updatePosition(move) {
    let position = {...this.state.position};
    position[move.to] = position[move.from];
    position[move.from] = null;
    this.set({position});
  }

  getOtherPlayer(player) {
    return player == this.players[0] ? this.players[1] : this.players[0];
  }
}
