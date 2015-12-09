import React from 'react';

class Board extends React.Component {

  static propTypes = {
    position: React.PropTypes.arrayOf(React.PropTypes.array)
  }
  
  render() {
    const renderCells = (position) =>
      <table>
        <tbody>
          {position.map(function(row, i) {
            return (
              <tr key={i}>
                {row.map(function(sq, j) {
                  return <td key={j}>{sq ? sq.render() : '.'}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

    return (
      <div>
        {renderCells(this.props.position)}
      </div>
    )
  }
}

export default Board;
