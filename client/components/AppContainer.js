import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as moment from 'moment';

// React Router
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history'; // Import history in any component you want to use it

// Containers
import EditorContainer from './Editor/EditorContainer';
import RegisterContainer from './Auth/RegisterContainer';
import LoginContainer from './Auth/LoginContainer';
import NavbarContainer from './NavbarContainer';
import ProfileContainer from './Profile/ProfileContainer';
import MyWorksContainer from "./Works/MyWorksContainer";

// Components
//import Icon from './modules/Icon';
import {PageWrapper} from "./elements";
import {Select} from "./modules/Select";

// Thunks 
import fetchUserThunk from '../thunks/fetchUserThunk';

class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user
		}
	}

	componentWillMount() {
		// console.log('mounting', this.props);

		// If user is not in redux store, fetch from server
		if (!this.props.user.username) {
			this.props.fetchUser();
		}

		// Sets redux store paramater isEditing to true
		if (window.location.pathname.includes('/edit')) {
			this.props.changeNav();
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({user: nextProps.user})
	}
    //
	// componentDidMount() {
	//     const map = {0:'01', 1: '01', 2:'01', 3: '03', 4:'04', 5: '06', 6: '07', 7:'08',  8: '09', 9: '10', 10: '11', 11: '12'}
    //
	//     const dateObj = new Date();
    //
     //    const date = dateObj.
     //    const time = new Date().toTimeString()[0];
	// 	console.log(moment());
	// }

	render() {

		if (this.state.user.fetching) {
			console.log('fetching');
			return (
				<PageWrapper>
				</PageWrapper>
			);
		}

		return(
			<Router history={history}>
	        	<div>
			    	<NavbarContainer />
					<Switch>
						<Route exact
							   path="/"
							   render={() => <div className="page-wrapper frame">
												<h1>Home page</h1>
								   				<div>
                                                    <Select placeholder="Type"
                                                            sId={'s-test'}
                                                            dId={'d-test'}
                                                            options={[{text: 'option 1'}, {text: 'option 2'}, {text: 'option 3'}]}>
                                                    </Select>
												</div>
											</div>}/>
						<Route path="/login" component={LoginContainer}/>
						<Route path="/register" component={RegisterContainer}/>
						<Route path="/new/draft" component={EditorContainer}/>
						<Route path="/edit/draft/:id" component={EditorContainer}/>
						<Route path="/my/works" component={MyWorksContainer}/>
						<Route path="/u/:username" render={(props) => <ProfileContainer {...props} />} />
					</Switch>
	    		</div>
        	</Router>
		);
	}
}

AppContainer.propTypes = {
	fetchUser: PropTypes.func,
	changeNav: PropTypes.func,
	user: PropTypes.object
};

const mapStateToProps = (state) => ({
	user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
	fetchUser: () => dispatch(fetchUserThunk()),
	changeNav: () => dispatch({type: 'OPEN_EDIT'})
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);