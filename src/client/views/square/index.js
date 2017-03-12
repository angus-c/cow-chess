import React from 'react';
import classnames from 'classnames';

import './square.css';

class Square extends React.Component {
  static propTypes = {
    location: React.PropTypes.number,
    pieceClassName: React.PropTypes.string,
    selected: React.PropTypes.bool,
    shaded: React.PropTypes.bool,
    squareSelected: React.PropTypes.func
  };

  static defaultValues = {
    shaded: false
  };

  render() {
    const { selected, shaded, pieceClassName } = this.props;
    const className = classnames(
      'square',
      'piece',
      {shaded},
      pieceClassName,
      {selected}
    );
    return <div className={className} onClick={e=>this.squareClicked(e)}></div>;
  }

  squareClicked(e) {
    const {
      location,
      selected,
      squareSelected
    } = this.props;
    squareSelected(selected ? null : location);
  }
}

export default Square;
