class Move {
  constructor(from, to) {
    // squares range from 0 (NW) to 63 (SE)
    this.from = from;
    this.to = to;
  }
  
  toString() {
    return `[${1 + this.from%8},${1 + Math.floor(this.from/8)}
->[${1 + this.to%8},${1 + Math.floor(this.to/8)}]`
  }
}

export default Move
