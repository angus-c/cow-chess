import React from 'react';

import './info.css';

class Info extends React.Component {

  static propTypes = {
    moves: React.PropTypes.arrayOf(React.PropTypes.object),
    config: React.PropTypes.object
  }

  render() {
    const {moves, config} = this.props;
    return (
      <div className='info'>
        <div className='recentMoves'>
          <ul>
            <li key={'header'}>
              <span className='header movePiece'>piece</span>
              <span className='header moveSquares'>from/to</span>
              <span className='header moveCapture'>captured</span>
              <span className='header moveTime'>time</span>
            </li>
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
        <div className='settings'>
          <ul>
            <li className='settingsRow'>
              <span className='settingsLabel'>probe depth</span>
              <input
                className='numberInput'
                ref='probeDepth'
                type='number'
                min='0'
                max='7'
                defaultValue={config.probeDepth}
              >
              </input>
            </li>
            <li className='settingsRow'>
              <span className='settingsLabel'>cut off depth</span>
              <input
                className='numberInput'
                ref='cutOffDepth'
                type='number'
                min='0'
                max='1'
                defaultValue={config.cutOffDepth}
              >
              </input>
            </li>
            <li className='settingsRow'>
              <span className='settingsLabel'>cut off proportion</span>
              <input
                className='numberInput'
                ref='cutOffProportion'
                type='number'
                min='0'
                max='1'
                defaultValue={config.cutOffProportion}
              >
              </input>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Info;
