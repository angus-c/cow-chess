import React from 'react';

import './info.css';

class Info extends React.Component {

  static propTypes = {
    moves: React.PropTypes.arrayOf(React.object) /* TODO */
  }

  render() {
    const moves = this.props.moves;
    return (
      <div className='info'>
        <div className='recentMoves'>
          <ul>
            {moves.map((move, i) => {
              return <li key={i}>{move.toString()}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Info;
