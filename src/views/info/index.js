import React from 'react';

import game from '../../data/game';

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
            <li key={'header'}>
              <span className='header'>settings</span>
            </li>
            <li className='settingsRow'>
              <span className='settingsLabel'>probe depth</span>
              <input
                className='numberInput'
                type='number'
                min='0'
                max='7'
                defaultValue={config.probeDepth}
                onChange={this.settingChanged.bind(this, 'probeDepth')}
              >
              </input>
            </li>
            <li className='settingsRow'>
              <span className='settingsLabel'>cut off depth</span>
              <input
                className='numberInput'
                type='number'
                min='0'
                max='7'
                defaultValue={config.cutOffDepth}
                onChange={this.settingChanged.bind(this, 'cutOffDepth')}
              >
              </input>
            </li>
            <li className='settingsRow'>
              <span className='settingsLabel'>cut off proportion</span>
              <input
                className='numberInput'
                type='number'
                min='0'
                max='1'
                step='0.1'
                defaultValue={config.cutOffProportion}
                onChange={this.settingChanged.bind(this, 'cutOffProportion')}
              >
              </input>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  settingChanged(setting, e) {
    // TODO really need an action here
    game.set({
      config: Object.assign({}, this.props.config, {[setting]: Number(e.target.value)})
    });
  }
}

export default Info;
