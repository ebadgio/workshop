import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

// Reducers
import userReducer from './userReducer';

const rootReducer = combineReducers({
	userReducer: userReducer,
	routing: routerReducer
	// add all your reducers here 
});

export default rootReducer;