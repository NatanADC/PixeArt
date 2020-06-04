import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const colors = []
fetch('http://api.noopschallenge.com/hexbot?count=10').then(response =>
  response.json()
).then(myJson =>
   myJson.colors.map(item => colors.push(item.value))
).then(()=>
ReactDOM.render(
  <React.StrictMode>
    <App colors={colors} />
  </React.StrictMode>,
  document.getElementById('root')
)
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
