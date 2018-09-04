import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import {FlatInput} from '../modules/TextInput';
import {ButtonPrimary} from '../modules/Button';

// Thunks
import registerThunk from '../../thunks/registerThunk';

class RegisterContainer extends React.Component {
	constructor() {
		super();
		this.state = {}
	}

	registerUser() {
		const username = document.getElementById('register-username').value;
		const fname = document.getElementById('register-fname').value;
		const lname = document.getElementById('register-lname').value;
		const email = document.getElementById('register-email').value;
		const password = document.getElementById('register-password').value;
		const confirm = document.getElementById('register-password-confirm').value;
		console.log(username, password, fname, lname, email);
		this.props.register(username, fname, lname, email, password);
	}

	render() {
		return (

			<div className="page-wrapper frame">
				<div className="content-section box col-center">
					<div className="w-fill">
						<h2>Register</h2>
					</div>
					<FlatInput placeholder="Username" id="register-username" type="text"/>
					<FlattInput placeholder="First Name" id="register-fname"type="text"/>
					<FlatInput placeholder="Last Name" id="register-lname" type="text"/>
					<FlatInput placeholder="Email" id="register-email" name="email" type="text"/>
					<FlatInput placeholder="Password" password id="register-password" type="text"/>
					<FlatInput placeholder="Confirm password" password id="register-password-confirm" type="text"/>
					<ButtonPrimary style={{marginLeft: 'auto'}}
                                   onPointerDown={() => this.registerUser()}>
                        Sign up
                    </ButtonPrimary>
				</div>
			</div>
		);
	}
};

RegisterContainer.propTypes = {
	register: PropTypes.func

};

const mapStateToProps = (state) => ({
	
});

const mapDispatchToProps = (dispatch) => ({
  	register: (username, fname, lname, email, password) => dispatch(registerThunk(username, fname, lname, email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);