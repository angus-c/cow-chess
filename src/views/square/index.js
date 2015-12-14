import React from 'react';
import classnames from 'classnames';

import './square.css';

class Square extends React.Component {

  static propTypes = {
    shaded: React.PropTypes.bool,
    piece: React.PropTypes.object
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
