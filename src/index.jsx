import './styles/style.scss'
import * as React from 'react'
import ReactDOM from 'react-dom'

// this is the HTML element in which we want React to render
const reactDomContainer = document.getElementById('app')

// Babel will transpile this into ES5 syntax
const App = () => (
  <>
    <h1>React.js</h1>
    <h2>This app has been set up from scratch!</h2>
  </>
)

const rootComponent = App();
// instruct ReactDom to render or React App in the specified HTML element
// and mount the specified component
ReactDOM.render(rootComponent, reactDomContainer);
