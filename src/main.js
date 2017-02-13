import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers/counter';


import Counter from './components/counter';

const store = createStore(reducers);
// store.subscribe(reducers);
// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

console.log(reducers);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store = { store }>
      <Counter>
      </Counter>
    </Provider>,
    document.getElementById('root'),
  );
});

console.log('hello world!');
