import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';

import rootReducer from './reducers';
import App from './components/App'

const store = createStore(
  rootReducer,
  compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
