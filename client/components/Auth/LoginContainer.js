import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import TextInput from '../elements/TextInput';
import Button from '../elements/Button';

// Thunks
import loginThunk from '../../thunks/loginThunk';

class LoginContainer extends React.Component {
	constructor() {
		super();

	}

	loginUser() {
		const username = document.getElementById('login-username').value;
		const password = document.getElementById('login-password').value;
		console.log('hit button', username, password);
		this.props.login(username, password);
	}

	render() {
		return (
			<div className="page-wrapper frame">
				<div className="content-section box col">
					<div className="w-fill">
						<h2>Login</h2>
					</div>
					<TextInput placeholder="Email" id="login-username" />
					<TextInput placeholder="Password" id="login-password" password />
					<Button type="primary"
							style={{marginLeft: 'auto'}}
							action={() => this.loginUser()} 
							contents="Sign In"/>
				</div>
			</div>
		);
	}
};

LoginContainer.propTypes = {
	login: PropTypes.func
};

const mapStateToProps = (state) => ({
	
});

const mapDispatchToProps = (dispatch) => ({
	login: (email, password) => dispatch(loginThunk(email, password))
  	
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);