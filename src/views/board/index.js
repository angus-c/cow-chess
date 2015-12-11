import React from 'react';

class Board extends React.Component {

  static propTypes = {
    position: React.PropTypes.arrayOf(React.PropTypes.object)
  }
  
  render() {
    const renderCells = (position) =>
      <table>
        <tbody>
          {[0,1,2,3,4,5,6,7].map((rowId, i) => {
            return (
              <tr key={`r${i}`}>
                {[0,1,2,3,4,5,6,7].map((columnId, j) => {
                  const sq = position[rowId*8 + columnId];
                  return <td key={j}>{sq ? sq.render() : '.'}</td>
                })}
              </tr>
            );
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
