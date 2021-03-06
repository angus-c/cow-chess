import React from 'react';

import Square from '../square';

import './board.css';

class Board extends React.Component {

  static propTypes = {
    position: React.PropTypes.object,
    selected: React.PropTypes.number,
    squareSelected: React.PropTypes.func
  };

  render() {
    const renderCells = (position) => (
      <div className='grid'>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((rowId, i) => (
          <div className='row' key={`r${i}`}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((columnId, j) => {
              const piece = position[rowId * 8 + columnId];
              const location = i * 8 + j;
              return (
                <Square
                  key={j}
                  location={location}
                  pieceClassName={piece ? piece.className : null}
                  selected={this.props.selected == location}
                  shaded={((i + j) % 2) == 1}
                  squareSelected = {this.props.squareSelected}
                />
              );
            })}
          </div>
        ))}
      </div>
    );

    return (
      <div className='board'>
        {renderCells(this.props.position)}
      </div>
    );
  }
}

export default Board;
