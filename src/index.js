import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import Main from './components/Main.js';
import store from './store/Store.js';

ReactDOM.render(
  <Provider store={store} >
    <Main />
  </Provider>,
  document.getElementById('root')
);