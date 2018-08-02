import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// React Router
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history'; // Import history in any component you want to use it

// Containers
import EditorContainer from './Editor/EditorContainer';
import RegisterContainer from './Auth/RegisterContainer';
import LoginContainer from './Auth/LoginContainer';
import NavbarContainer from './NavbarContainer'

// Thunks 
import fetchUserThunk from '../thunks/fetchUserThunk';

class AppContainer extends React.Component {
	constructor() {
		super();
		this.state = {}
	}

	componentWillMount() {
		console.log('mounting', this.props);
		if (!this.props.user.username) {
            this.props.fetchUser();
        }
	}

	render() {
		return(
			<Router history={history}>
	        	<div>
			    	<NavbarContainer />
					<Switch>
						<Route path="/" exact render={() => <div className="page-wrapper frame"><h1>Home page</h1></div>}/>
						<Route path="/login" component={LoginContainer}/>
						<Route path="/register" component={RegisterContainer}/>
						<Route path="/edit" component={EditorContainer}/>
					</Switch>
	    		</div>
        	</Router>
		);
	}
}

AppContainer.propTypes = {
	fetchUser: PropTypes.func
};

const mapStateToProps = (state) => ({
	user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
	fetchUser: () => dispatch(fetchUserThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);