const south = {
  symbolForPlayer(symbol) {
    return symbol.toUpperCase();
  },
  relativeDirection(actualDirection) {
    return -actualDirection;
  },
  computer: false /* default */
};

export default south;
