import React from 'react';
import ReactDOM from 'react-dom';

import game from '../../data/game';
import Board from '../board';
import Info from '../info';
import './chess.css';

class Chess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...game.get()};
    game.emitter.on('gameChange', data => this._update(data));
  }

  componentDidMount() {
    setTimeout(() => game.nextPlay(), 100);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.nextPlayer != this.state.nextPlayer) {
      setTimeout(() => game.nextPlay(), 100);
    }
  }

  render() {
    const {position, moves} = this.state;
    return (
      <div className='chess'>
        <Board position={position} selected={this.state.selectedSquare} />
        <Info moves={moves.map(move => game.getMoveDisplayEntities(move, position))}/>
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
