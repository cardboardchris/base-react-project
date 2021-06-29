import * as React from 'react'
import PropTypes from 'prop-types'
import Square from './Square'

function calculateWinner(squares) {
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

export default class Board extends React.Component {

  handleClick(i) {
    const { squares, xIsNext } = this.props
    const squaresCopy = squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squaresCopy[i] = xIsNext ? 'X' : 'O'
    this.setState({
      squares: squaresCopy,
      xIsNext: !xIsNext
    })
  }

  renderSquare(i) {
    const { squares } = this.props
    return (
      <Square
        value={ squares[i] }
        onClick={ () => this.handleClick(i) }
      />
    )
  }

  render () {
    const { squares, xIsNext } = this.props
    const winner = calculateWinner(squares)
    let status
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`
    }

    return (
      <div>
        <div className="status">{ status }</div>
        <div className="board-row">
          { this.renderSquare(0) }
          { this.renderSquare(1) }
          { this.renderSquare(2) }
        </div>
        <div className="board-row">
          { this.renderSquare(3) }
          { this.renderSquare(4) }
          { this.renderSquare(5) }
        </div>
        <div className="board-row">
          { this.renderSquare(6) }
          { this.renderSquare(7) }
          { this.renderSquare(8) }
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  xIsNext: PropTypes.bool.isRequired
}
