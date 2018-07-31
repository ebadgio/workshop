import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import TextInput from '../TextInput';
import Button from '../Button';

class LoginContainer extends React.Component {

	render() {
		return (
			<div className="page-wrapper frame">
				<div className="content-section box col">
					<div className="w-fill">
						<h2>Login</h2>
					</div>
					<TextInput placeholder="Email" />
					<TextInput placeholder="Password" password />
					<Button type="primary" style={{marginLeft: 'auto'}} contents="Sign In"/>
				</div>
			</div>
		);
	}
};

LoginContainer.propTypes = {

};

const mapStateToProps = (state) => ({
	
});

const mapDispatchToProps = (dispatch) => ({
  	
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);