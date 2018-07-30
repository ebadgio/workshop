import React from 'react';
import { connect } from 'react-redux';

// Components


class HomeContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			headerText: props.headerText // Set internal state to header props
		};
	}

	// This will be called whenever this container receives new froms from the redux store
	componentWillReceiveProps(nextProps) {
		// Update the internal state which will refresh the componenet
		this.setState({headerText: nextProps.headerText});
	}

	render() {
		return(
			<div className="page-wrapper frame">

			</div>
		);
	}
}

// Converts desired redux state fields to props for this container
const mapStateToProps = (state) => ({
	headerText: state.homeReducer.header
});

// Allows actions to be called from the container through props
const mapDispatchToProps = (dispatch) => ({
  	someAction: (newHeader) => dispatch({type: 'CHANGE_HEADER', header: newHeader})
});

// Must connect the container to the redux store
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);