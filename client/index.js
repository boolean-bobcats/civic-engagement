import React from 'react';
import ReduxPromise from 'redux-promise';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';
import resultsComp from './containers/reqContainer';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

import locationBar from './components/locationBar';
import req from './src/req';

const store = createStore(rootReducer);
const meow = function meow() {
  return (<div>
    <h1>welcome to meow!!</h1>
  </div>);
};

console.log(store.getState())
render((
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <Router history={browserHistory} >
      <Route path="/" component={resultsComp} />
    </Router>
  </Provider>), document.getElementById('root'));
