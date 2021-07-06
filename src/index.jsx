import './styles/style.scss'
import ReactDOM from 'react-dom'
import App from './components/app'

// this is the HTML element in which we want React to render
const reactDomContainer = document.getElementById('app')

const rootComponent = App();
// instruct ReactDom to render or React App in the specified HTML element
// and mount the specified component
ReactDOM.render(rootComponent, reactDomContainer);
