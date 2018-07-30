import React from 'react';
import { connect } from 'react-redux';

// Components
import TextEditor from '../Editor/TextEditor';

class EditorContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return(
			<div className="page-wrapper frame">
				<TextEditor />
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
	
});


const mapDispatchToProps = (dispatch) => ({
  	
});


export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);