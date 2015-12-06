import React from 'react';
import ReactDOM from 'react-dom';

// data
import game from './data/game';

// views
import Board from './views/board';

class Chess extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {...game.get()}
    game.emitter.on('gameChange', data => this._update(data));
  }

  render() {
    return <Board position={this.state.position}/>
  }
  
  _update(data) {
    this.setState({...data});
  }
}

ReactDOM.render(
  <Chess/>,
  document.querySelector('.container')
);
