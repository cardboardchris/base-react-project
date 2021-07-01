import './styles/style.scss'
import * as React from 'react'
import ReactDOM from 'react-dom'
import Game from './components/Game'

// this is the HTML element in which we want React to render
const reactDomContainer = document.getElementById('app')

// Babel will transpile this into ES5 syntax
const App = () => (
  <>
    <h1>React.js</h1>
    <h2>This app has been set up from scratch!</h2>
    <h3>Tic-Tac-Toe Tutorial</h3>
    <Game />
  </>
)

const rootComponent = App();
// instruct ReactDom to render or React App in the specified HTML element
// and mount the specified component
ReactDOM.render(rootComponent, reactDomContainer);
