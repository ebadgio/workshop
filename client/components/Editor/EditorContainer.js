import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import TextEditor from '../Editor/TextEditor';


class EditorContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({user: nextProps.user})
	}

	render() {
		return(
			<div className="page-wrapper frame">
				<TextEditor user={this.state.user} />
			</div>
		);
	}
}

EditorContainer.propTypes = {
	user: PropTypes.object
};

const mapStateToProps = (state) => ({
	user: state.userReducer
});


const mapDispatchToProps = (dispatch) => ({
  	
});


export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);