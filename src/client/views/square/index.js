import React from 'react';
import classnames from 'classnames';

import game from '../../data/game';

import './square.css';

class Square extends React.Component {
  static propTypes = {
    location: React.PropTypes.number,
    pieceClassName: React.PropTypes.string,
    selected: React.PropTypes.bool,
    shaded: React.PropTypes.bool
  };

  static defaultValues = {
    shaded: false
  };

  render() {
    const { selected, shaded, pieceClassName } = this.props;
    debugger;
    const className = classnames(
      'square',
      {shaded},
      {pieceClassName},
      {selected}
    );
    return <div className={className} onClick={e=>this.squareClicked(e)}></div>;
  }

  squareClicked(e) {
    game.squareSelected(this.props.selected ? null : this.props.location);
  }
}

export default Square;
