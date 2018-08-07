import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

// Reducers
import userReducer from './userReducer';
import editReducer from './editReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
	userReducer: userReducer,
	editReducer: editReducer,
	profileReducer: profileReducer,
	routing: routerReducer
});

export default rootReducer;