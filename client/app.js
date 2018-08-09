import React from 'react';
import ReactDOM from 'react-dom';

// Redux + router + thunks
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware} from 'react-router-redux'

// Apply the routing middleware to hisory
import history from './history';
const routing = routerMiddleware(history);

// Root reducer
import rootReducer from './reducers/index';

// Initialize redux store and thunk middleware
const store = createStore(
    rootReducer,
    applyMiddleware(thunk, routing)
);


import AppContainer from './components/AppContainer';

ReactDOM.render(
  <Provider store={store}>
        <AppContainer />
  </Provider>,
   document.getElementById('root'));