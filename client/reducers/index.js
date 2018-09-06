import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

// Reducers
import userReducer from './userReducer';
import editReducer from './editReducer';
import profileReducer from './profileReducer';
import workReducer from "./workReducer";

const rootReducer = combineReducers({
	userReducer: userReducer,
	editReducer: editReducer,
	profileReducer: profileReducer,
	workReducer: workReducer,
	routing: routerReducer
});

export default rootReducer;