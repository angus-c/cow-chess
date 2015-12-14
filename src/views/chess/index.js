import React from 'react';
import ReactDOM from 'react-dom';

import game from '../../data/game';
import Board from '../board';
import './chess.css';

class Chess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...game.get()};
    game.emitter.on('gameChange', data => this._update(data));
  }

  render() {
    return (
      <div className='chess'>
        <Board position={this.state.position} />
      </div>
    );
  }

  _update(data) {
    this.setState({...data});
  }
}

ReactDOM.render(
  <Chess/>,
  document.querySelector('.container')
);
