const north = {
  pieces: [],
  symbolForPlayer(symbol) {
    return symbol.toLowerCase();
  },
  relativeDirection(actualDirection) {
    return actualDirection;
  },
  computer: true /* default */
};

export default north;
