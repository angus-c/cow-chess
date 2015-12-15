import React from 'react';

import Move from '../../modules/Move';

import './info.css';

class Info extends React.Component {

  static propTypes = {
    lastMove: React.PropTypes.instanceOf(Move)
  }

  render() {
    const lastMove = this.props.lastMove;
    return (
      <div className='info'>
        <span>{lastMove ? lastMove.toString() : null}</span>
      </div>
    );
  }
}

export default Info;
