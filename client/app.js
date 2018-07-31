import React from 'react';
import ReactDOM from 'react-dom';

// Redux + thunks
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// React Router
import { Router, Route, Switch } from 'react-router-dom';
import history from './history'; // Import history in any component you want to use it

// Root reducer
import rootReducer from './reducers/index';

// Containers
import HomeContainer from './components/Home/HomeContainer';
import EditorContainer from './components/Editor/EditorContainer';
import RegisterContainer from './components/Auth/RegisterContainer';
import LoginContainer from './components/Auth/LoginContainer';

// Components
import Navbar from './components/Navbar'

// Initialize redux store and thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
        <Router history={history}>
        	<div>
		    	<Navbar title={"Workshop"}
		    			tabs={[
		    					{text: "Home", route: '/home'},
		    					{text: "Profile", route: '/profile'}
							]}/>
				<Switch>
					<Route path="/" exact component={HomeContainer}/>
					<Route path="/login" exact render={(props) => <LoginContainer {...props}/>}/>
					<Route path="/register" exact render={(props) => <RegisterContainer {...props}/>}/>
					<Route path="/edit" component={EditorContainer}/>
				</Switch>
    		</div>
        </Router>
  </Provider>,
   document.getElementById('root'));