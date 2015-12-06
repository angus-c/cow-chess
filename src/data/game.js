import EventEmitter from 'event-emitter';

const COLORS = ['#FFF', '#000'];
const [R, N, B, K, Q, P, _] = ['R', 'N', 'B', 'K', 'Q', 'P', '.'];
const STARTING_POSITION = [
  [R,N,B,K,Q,B,N,R],
  [P,P,P,P,P,P,P,P],
  [_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_],
  [P,P,P,P,P,P,P,P],
  [R,N,B,K,Q,B,N,R]
];

const game = {
  state: {
    position: STARTING_POSITION,
    move: 0,
    computerColor: COLORS[1]
  },

  get() {
    return this.state;
  },

  set(updates) {
    this.state = Object.assign({}, this.state, updates);
    this.emitter.emit('gameChange', this.state);
  },

  emitter: EventEmitter({})
}

export default game;
