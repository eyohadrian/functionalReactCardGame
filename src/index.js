import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';

import {GlobalContextProvider} from "./context/global-context";

ReactDOM.render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
