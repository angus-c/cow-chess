import React from 'react';
import classnames from 'classnames';

import game from '../../data/game';
import Piece from '../../modules/pieces/Piece';

import './square.css';

class Square extends React.Component {
  static propTypes = {
    location: React.PropTypes.number,
    piece: React.PropTypes.instanceOf(Piece),
    selected: React.PropTypes.bool,
    shaded: React.PropTypes.bool
  };

  static defaultValues = {
    shaded: false
  };

  render() {
    const { selected, shaded, piece } = this.props;
    const className = classnames(
      'square',
      {shaded},
      {piece},
      {[piece && piece.getClassName()]: piece},
      {selected}
    );
    return <div className={className} onClick={e=>this.squareClicked(e)}></div>;
  }

  squareClicked(e) {
    game.squareSelected(this.props.selected ? null : this.props.location);
  }
}

export default Square;
