import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import './Styles/styles.css';

import Main from './Components/Main.js';
import store from './Store/Store.js';

ReactDOM.render(
  <Provider store={store} >
    <Main />
  </Provider>,
  document.getElementById('root')
);