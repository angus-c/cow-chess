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
              return (
                <li key={i}>
                  <span className='piece'></span>
                  <span className='fromto'>{move.fromto}</span>
                  <span className='capture'></span>
                  <span className='time'>{move.time}</span>
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
