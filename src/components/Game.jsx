import * as React from 'react'
import Board from './Board'

export default class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  handleClick = (i) => {
    console.log(i)
    const { history, xIsNext, stepNumber } = this.state
    const newHistory = history.slice(0, stepNumber + 1)
    const current = newHistory[newHistory.length - 1]
    const squares = current.squares.slice()
    if (this.calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : 'O'
    this.setState({
      history: newHistory.concat([{
        squares
      }]),
      xIsNext: !xIsNext,
      stepNumber: history.length,
    })
  }

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  render () {
    const { history, xIsNext } = this.state
    const current = history[history.length - 1]
    const winner = this.calculateWinner(current.squares)
    // console.log(history)

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move ${ move }` : 'Go to game start'
      return (
        <li key={ step }>
          <button
            type="button"
            onClick={ () => this.jumpTo(move) }
          >
            { desc }
          </button>
        </li>
      )
    })

    let status
    if (winner) {
      status = `Winner: ${ winner }`
    } else {
      status = `Next player: ${ xIsNext ? 'X' : 'O' }`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={ current.squares }
            onClick={ (i) => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}
