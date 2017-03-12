import React from 'react';
import ReactDOM from 'react-dom';

import Game from '../../data/game';
import Board from '../board';
import Info from '../info';
import './chess.css';

class Chess extends React.Component {
  constructor(props) {
    super(props);
    this.game = new Game();
    this.state = {...this.game.get()};
    this.game.emitter.on('gameChange', data => this._update(data));
  }

  componentDidMount() {
    if (!this.state.loading) {
      this.game.nextPlay();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.nextPlayer != this.state.nextPlayer) {
      setTimeout(() => this.game.nextPlay(), 0);
    }
  }

  render() {
    const {loading, position, moves} = this.state;
    if (loading) {
      return <div>{'loading...'}</div>;
    }
    return (
      <div className='chess'>
        <Board
          position={position}
          selected={this.state.selectedSquare}
          squareSelected={this.game.squareSelected.bind(this.game)}
        />
        <Info
          moves={moves.map(move => this.game.getMoveDisplayEntities(move, position))}
          config={this.game.get().config}
        />
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
