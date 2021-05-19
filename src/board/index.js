import React from 'react';
import { Square } from '../square/index';

export class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square 
        key={ String(i) }
        winner={ this.props.winner.includes(i) }
        value={ this.props.squares[i] }
        onClick={ () => this.props.onClick(i) }
      />
    );
  }

  render() {
    const maxSquares = 3;
    let x = 0;
    let row = [];
    
    for(let r = 0; r < maxSquares; r++) {
        let column = [];

        for (let c = 0; c < maxSquares; c++) column.push(this.renderSquare(x++));

        row.push( <div key={ String(r) } className="board-row" >{ column }</div> );
      };

    return (
      <div>
        { row }
      </div>
    );
  }
}