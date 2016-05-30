import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import configureStore from '../store/configureStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import CoasterApp from './CoasterApp';
import Home from './Home';
import Help from './Help';

const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={CoasterApp}>
          <IndexRoute component={Home} />
          <Route path="/help" component={Help} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default Root;
