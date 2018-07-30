import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// React Router
import { Router, Route, Switch } from 'react-router-dom';
import history from './history'; // Import history in any component you want to use it

// Root reducer
import rootReducer from './reducers/index';

// Components
import Navbar from './components/Navbar'
import HomeContainer from './components/Home/HomeContainer';
import EditorContainer from './components/Editor/EditorContainer';

// Initialize redux store
const store = createStore(rootReducer);

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
					<Route path="/edit" component={EditorContainer}/>
				</Switch>
    		</div>
        </Router>
  </Provider>,
   document.getElementById('root'));