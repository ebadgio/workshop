import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  Link
} from 'react-router-dom'

// Components
import Button from './Button';

class NavbarContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			user: {}
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({user: nextProps.user});
	}

	render() {
		
		return(
			<div className="nav shadow frame">

				<div className="nav-content row-apart">
					<h2>
						Workshop
					</h2>
					{
						this.state.user.username ? 
						<div className="row nav-tabs">
							<div className="nav-link color-hover">{this.state.user.username}</div>
						</div>
						:
						<div className="row nav-tabs">
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
};

NavbarContainer.propTypes = {
	user: PropTypes.object

};

const mapStateToProps = (state) => ({
	user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
  	
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
