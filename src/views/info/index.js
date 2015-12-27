import React from 'react';

import './info.css';

class Info extends React.Component {

  static propTypes = {
    moves: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  render() {
    const moves = this.props.moves;
    return (
      <div className='info'>
        <div className='recentMoves'>
          <ul>
            {moves.map((move, i) => {
              const {piece, fromTo, capturedPiece, time} = move;
              return (
                <li key={i}>
                  <span className='movePiece'>{piece}</span>
                  <span className='moveSquares'>{fromTo}</span>
                  <span className='moveCapture'>{capturedPiece}</span>
                  <span className='moveTime'>{time}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Info;
