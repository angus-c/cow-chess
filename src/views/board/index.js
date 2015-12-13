import React from 'react';
import classnames from 'classnames';

import './board.css';

class Board extends React.Component {

  static propTypes = {
    position: React.PropTypes.arrayOf(React.PropTypes.object)
  }
  
  render() {
    const renderCells = (position) =>
      <div className='grid'>
        {[0,1,2,3,4,5,6,7].map((rowId, i) => {
          return (
            <div className='row' key={`r${i}`}>
              {[0,1,2,3,4,5,6,7].map((columnId, j) => {
                const piece = position[rowId*8 + columnId];
                const squareClass = classnames(
                  'square',
                  {shaded: ((i + j) % 2) == 1},
                  {piece: piece},
                  {[piece && piece.getClassName()]: piece}
                )
                return <div className={squareClass} key={j}></div>
              })}
            </div>
          );
        })}
      </div>

    return (
      <div className='board'>
        {renderCells(this.props.position)}
      </div>
    )
  }
}

export default Board;
