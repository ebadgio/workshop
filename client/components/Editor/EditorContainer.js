import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';

// Components
import TextEditor from '../Editor/TextEditor';
import {Loader} from '../modules/Loader';

// Thunks
import saveDraftThunk from '../../thunks/saveDraftThunk';
import createNewWorkThunk from '../../thunks/createNewWorkThunk';
import fetchDraftThunk from '../../thunks/fetchDraftThunk';

class EditorContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		    loading: true,
			user: props.user,
			isSaving: props.isSaving,
			saveSuccess: props.saveSuccess,
            fromDraft: props.fromDraft,
            draftId: props.draftId,
            value: props.value,
            title: props.title
		};
		this.saveDraft = this.saveDraft.bind(this);
		this.publish = this.publish.bind(this);
	}

	componentWillMount() {
	    console.log(this.props.match);
	    const id = this.props.match.params.id;
	    if (this.props.match.params.id) {
            this.props.fetchDraft(id);
		} else {
	        this.props.newDraft();
        }
    }

	componentWillReceiveProps(nextProps) {
	    console.log('edit container', nextProps);
		this.setState({isSaving: nextProps.isSaving,
            saveSuccess: nextProps.saveSuccess,
            fromDraft: nextProps.fromDraft,
            draftId: nextProps.draftId,
            value: nextProps.value,
            title: nextProps.title,
            loading: false});
	}

	componentWillUnmount() {
		this.props.closeEdit();
	}

	saveDraft(author, title, content, draftId) {
		this.props.saveDraft(author, title, content, draftId);
	}

    publish(title, content, type, topics, desc) {
        this.props.createWork(this.props.user._id, title, content, type, topics, desc);
    }

	render() {

	    if (!this.props.user._id) {
	        return <Redirect to="/"/>
        }

        if (this.state.loading) {
	        return (
                <div className="page-wrapper frame">
	                <Loader />
                </div>
            )
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
                            publish={this.publish}
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
    value: PropTypes.string,
    match: PropTypes.object,
    createWork: PropTypes.func,
    fetchDraft: PropTypes.func,
    newDraft: PropTypes.func,
    isEditing: PropTypes.bool
};

const mapStateToProps = (state) => ({
	user: state.userReducer,
	isSaving: state.editReducer.isSaving,
	saveSuccess: state.editReducer.saveSuccess,
	draftId: state.editReducer.draftId,
    fromDraft: state.editReducer.fromDraft,
    title: state.editReducer.title,
    value: state.editReducer.value,
	isEditing: state.editReducer.isEditing
});


const mapDispatchToProps = (dispatch) => ({
	saveDraft: (author, title, content, draftId) =>
							dispatch(saveDraftThunk(author, title, content, draftId)),
	closeEdit: () => dispatch({type: 'CLOSE_EDIT'}),
    fetchDraft: (id) => dispatch(fetchDraftThunk(id)),
    newDraft: () => dispatch({type: 'NEW_DRAFT'}),
    createWork: (author, title, content, type, topics, desc) => dispatch(createNewWorkThunk(author, title, content, type, topics, desc))
});


export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);