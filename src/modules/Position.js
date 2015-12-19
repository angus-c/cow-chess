const pieceRegEx = /[A-Z,a-z]/;

class Position {
  constructor(stringMap, pieceTypes, players) {
    if (stringMap) {
      this.stringMap = stringMap;
      this.pieceMap = this.createPieceMap(stringMap, pieceTypes, players);
    }
  }

  createPieceMap(stringMap, pieceTypes, players) {
    let PieceType;
    // squeareIds range from 0 (NW) to 63 (SE)
    return stringMap.split('').map((symbol, squareId) => {
      if (!pieceRegEx.test(symbol)) {
        return null;
      }
      const player = (symbol == symbol.toLowerCase()) ? players[0] : players[1];
      PieceType = pieceTypes[symbol.toLowerCase()];
      const piece = new PieceType(player);
      return piece;
    });
  }

  applyMove(move) {
    this.pieceMap[move.to] = this.pieceMap[move.from];
    this.pieceMap[move.from] = null;
    const stringMapArray = this.stringMap.split('');
    stringMapArray[move.to] = stringMapArray[move.from];
    stringMapArray[move.from] = '_';
    this.stringMap = stringMapArray.join('');
  }

  cloneMe() {
    const clone = new Position();
    clone.stringMap = this.stringMap;
    clone.pieceMap = [...this.pieceMap];
    return clone;
  }

  toString() {
    return this.stringMap;
  }
}

export default Position;
