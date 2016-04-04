import bishop from './bishop';
import king from './king';
import knight from './knight';
import pawn from './pawn';
import queen from './queen';
import rook from './rook';

const symbolLookup = {
  'b': bishop,
  'k': king,
  'n': knight,
  'p': pawn,
  'q': queen,
  'r': rook
};

export default function (symbol) {
  return symbolLookup[symbol.toLowerCase];
}
