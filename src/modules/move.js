class Move {
  constructor(from, to, player) {
    // squares range from 0 (NW) to 63 (SE)
    this.from = from;
    this.to = to;
    this.player = player;
  }

  toString() {
    const from = `${this.player.color} [${1 + this.from % 8},${1 + Math.floor(this.from / 8)}]`;
    const to = `[${1 + this.to % 8},${1 + Math.floor(this.to / 8)}]`;
    return `${from} -> ${to}`;
  }
}

export default Move;
