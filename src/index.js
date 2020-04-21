import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import {
//     configure
// } from "react-hotkeys";
import * as serviceWorker from './serviceWorker';

// // react hotkeys initialisation: allows event listening from inputs
// configure({
//     ignoreTags: []
// })
console.log('React Keys configured. Keyboards from any component, including inputs and text areas, will be listened.')

ReactDOM.render( < App / > , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();