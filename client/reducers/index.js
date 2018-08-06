import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

// Reducers
import userReducer from './userReducer';
import editReducer from './editReducer';

const rootReducer = combineReducers({
	userReducer: userReducer,
	editReducer: editReducer,
	routing: routerReducer
});

export default rootReducer;