import * as React from 'react'
import PropTypes from 'prop-types'
import Square from './Square'


export default class Board extends React.Component {

  renderSquare (i) {
    const { squares, onClick } = this.props
    return (
      <Square
        value={ squares[i] }
        onClick={ () => onClick(i) }
      />
    )
  }

  render () {
    return (
      <div>
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
  onClick: PropTypes.func.isRequired,
}
