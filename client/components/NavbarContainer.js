import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  Link
} from 'react-router-dom'

// Components
import Button from './elements/Button';

// Thunks
import logoutUserThunk from "../thunks/logoutUserThunk";

class NavbarContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			user: {}
		}
	}

	componentWillReceiveProps(nextProps) {
	    console.log('next', nextProps);
		this.setState({user: nextProps.user});
	}

	render() {
		
		return(
			<div className="nav shadow frame">

				<div className="nav-content row-apart">
					<h2>
                        <Link to="/">
						    Workshop
                        </Link>
					</h2>
					{
						this.state.user.username ? 
						<div className="row nav-tabs">
							<Link className="nav-link color-hover"
								  to={'/edit'}>
								edit
							</Link>
							<div className="nav-link color-hover">{this.state.user.username}</div>
							<div className="nav-link color-hover" onClick={() => this.props.logout()}>Logout</div>
						</div>
						:
						<div className="row nav-tabs">
							<Link className="nav-link color-hover"
								  to={'/edit'}>
								edit
							</Link>
							<Link className="nav-link color-hover"
								  to={'/login'}>
								Sign in
							</Link>
							<Link className="nav-link"
								  to={'/register'}>
								<Button type="outline-grey" contents="Get started"/>
							</Link>
						</div>
					}
				</div>
			</div>
		)
	}
}

NavbarContainer.propTypes = {
	user: PropTypes.object,
    logout: PropTypes.func
};

const mapStateToProps = (state) => ({
	user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
  	logout: () => dispatch(logoutUserThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
