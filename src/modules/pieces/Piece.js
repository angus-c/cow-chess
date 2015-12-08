import computer from '../players/computer';
import human from '../players/human';

class Piece {
  constructor(x, y, player) {
    this.position = [x, y];
    this.owner = player;
  }
  
  render() {
    return (this.owner === human) ? this.symbol.toUpperCase() : this.symbol.toLowerCase();
  }
}

export default Piece;
