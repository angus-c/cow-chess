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
            {/*
              <li key={'header'}>
                <span className='movePiece'>piece</span>
                <span className='moveSquares'>from/to</span>
                <span className='moveCapture'>captured</span>
                <span className='moveTime'>time</span>
              </li>
            */}
            {moves.map((move, i) => {
              const {piece, fromTo, capturedPiece, time, myTextClass, theirTextClass} = move;
              const pieceClass = `movePiece ${myTextClass}`;
              const capturedPieceClass = `moveCapture ${theirTextClass}`;
              return (
                <li key={i}>
                  <span className={pieceClass}>{piece}</span>
                  <span className='moveSquares'>{fromTo}</span>
                  <span className={capturedPieceClass}>{capturedPiece}</span>
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
