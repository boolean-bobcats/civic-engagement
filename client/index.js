import React from 'react';
import ReduxPromise from 'redux-promise';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


render((
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>), document.getElementById('root'));
