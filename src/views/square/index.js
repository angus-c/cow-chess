import React from 'react';
import classnames from 'classnames';

import Piece from '../../modules/pieces/Piece';

import './square.css';

class Square extends React.Component {

  static propTypes = {
    piece: React.PropTypes.instanceOf(Piece),
    shaded: React.PropTypes.bool
  }

  static defaultValues = {
    shaded: false
  }

  render() {
    const { shaded, piece } = this.props;
    const className = classnames(
      'square',
      {shaded},
      {piece},
      {[piece && piece.getClassName()]: piece}
    );
    return <div className={className}></div>;
  }
}

export default Square;
