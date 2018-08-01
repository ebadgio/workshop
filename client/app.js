import React from 'react';
import ReactDOM from 'react-dom';


// Redux + thunks
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Root reducer
import rootReducer from './reducers/index';

// Initialize redux store and thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

import AppContainer from './components/AppContainer';

ReactDOM.render(
  <Provider store={store}>
        <AppContainer />
  </Provider>,
   document.getElementById('root'));