import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';

// Components
import TextEditor from '../Editor/TextEditor';

// Thunks
import saveDraftThunk from '../../thunks/saveDraftThunk';


class EditorContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
			isSaving: props.isSaving,
			saveSuccess: props.saveSuccess,
            fromDraft: props.fromDraft,
            draftId: props.draftId,
            value: props.value,
            title: props.title
		};
		this.saveDraft = this.saveDraft.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	componentWillUnmount() {
		this.props.closeEdit();
	}

	saveDraft(author, title, content, draftId) {
		this.props.saveDraft(author, title, content, draftId);
	}

	render() {

	    if (!this.props.user._id) {
	        return <Redirect to="/"/>
        }

		return(
			<div className="page-wrapper frame">
				<TextEditor user={this.state.user}
							isSaving={this.state.isSaving} 
							saveSuccess={this.state.saveSuccess}
							draftId={this.state.draftId}
                            fromDraft={this.state.fromDraft}
							value={this.state.value}
							title={this.state.title}
							saveDraft={this.saveDraft}/>
			</div>
		);
	}
}

EditorContainer.propTypes = {
	user: PropTypes.object,
	isSaving: PropTypes.bool,
	saveSuccess: PropTypes.bool,
	saveDraft: PropTypes.func,
	closeEdit: PropTypes.func,
	draftId: PropTypes.string,
    fromDraft: PropTypes.bool,
    title: PropTypes.string,
    value: PropTypes.string
};

const mapStateToProps = (state) => ({
	user: state.userReducer,
	isSaving: state.editReducer.isSaving,
	saveSuccess: state.editReducer.saveSuccess,
	draftId: state.editReducer.draftId,
    fromDraft: state.editReducer.fromDraft,
    title: state.editReducer.title,
    value: state.editReducer.value
});


const mapDispatchToProps = (dispatch) => ({
	saveDraft: (author, title, content, draftId) =>
							dispatch(saveDraftThunk(author, title, content, draftId)),
	closeEdit: () => dispatch({type: 'CLOSE_EDIT'})
});


export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);