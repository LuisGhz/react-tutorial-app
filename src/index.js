import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './board/index';

class Game extends React.Component {

  // All sub classes with a constructor must call super at the beginning
  constructor(props) {
    super(props);
    this.state = {
      history: [{ 
        squares: Array(9).fill(null)
      }],
      coordinatesHistory: Array(9).fill(null),
      stepNumber: 0,
      xIsNext: true,
      isHistoryReverse: false
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const coordinatesHistory = this.state.coordinatesHistory.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const lastCoordinates = getLastCoordinates(i);
    
    if (calculateWinner(squares)[0] >= 0 || squares[i]) return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({ 
      history: history.concat([{
        squares: squares
      }]),
      coordinatesHistory: coordinatesHistory.concat(lastCoordinates),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: ( step % 2 ) === 0,
    })
  }

  CreateHistoryNav(history, stepNumber) {
    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move}` :
        `Go to game start`;

      return (
        <li key={ move } >
          <button className={ move === stepNumber ? 'bold-button' : null } onClick={ () => this.jumpTo(move) }>{ desc }</button>
        </li>
      );
    });

    if (this.state.isHistoryReverse) moves.reverse();

    return moves;
  }

  ReverseHistory() {
    this.setState({
      isHistoryReverse: !this.state.isHistoryReverse
    });
  }

  render() {
    const stepNumber = this.state.stepNumber;
    const history = this.state.history;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const currentCoordinates = this.state.coordinatesHistory[stepNumber] ?
      `Last move in column: ${ this.state.coordinatesHistory[stepNumber].column } and row: ${ this.state.coordinatesHistory[stepNumber].row }` :
      '';

    const moves = this.CreateHistoryNav(history, stepNumber);

    let status;
    if (winner[0] === -1) status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    if (history.length === 10 && (stepNumber + 1) === history.length) status = <b>Nobody wins =(</b>
    if (winner[0] >= 0) status = <b>Winner: { current.squares[winner[0]] }</b>



    return (
      <div className="game">
        <div className="game-board">
          <Board 
            winner={ winner }
            squares={ current.squares }
            onClick={ i => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{ currentCoordinates }</div>
          <div>{ status }</div>
          <div><button onClick={ () => this.ReverseHistory() } >Reverse history</button></div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // First vertical line
    [3, 4, 5], // Second vertical line
    [6, 7, 8], // Third vertical line
    [0, 3, 6], // First horizontal line
    [1, 4, 7], // Second horizontal line
    [2, 5, 8], // Third horizonal line
    [0, 4, 8], // \ line
    [2, 4, 6], // / line
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if ( squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) return [a, b, c];
  }

  return [-1, -1, -1];
}

function getLastCoordinates(i) {
  const coordinates = new Map();

  coordinates.set(0, { row: 1, column: 1 });
  coordinates.set(1, { row: 1, column: 2 });
  coordinates.set(2, { row: 1, column: 3 });
  coordinates.set(3, { row: 2, column: 1 });
  coordinates.set(4, { row: 2, column: 2 });
  coordinates.set(5, { row: 2, column: 3 });
  coordinates.set(6, { row: 3, column: 1 });
  coordinates.set(7, { row: 3, column: 2 });
  coordinates.set(8, { row: 3, column: 3 });

  return coordinates.get(i);
}