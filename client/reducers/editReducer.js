
const editReducer = (state = {isEditing: false,
	isSaving: false,
    saveSuccess: true,
    fromDraft: false,
    draftId: '',
    value: ''
}, action) => {

	switch (action.type) {
		case 'OPEN_EDIT':
			return {
				isSaving: false,
				isEditing: true,
				draftId: action.draftId,
                fromDraft: action.fromDraft,
                value: action.value
			};
		case 'CLOSE_EDIT':
			return {
				isSaving: false,
				isEditing: false
			};
        case 'START_SAVING':
			return {
				isSaving: true,
				isEditing: true,
				draftId: state.draftId,
                fromDraft: state.fromDraft,
                value: state.value
			};
		case 'DONE_SAVING':
			return {
				isSaving: false,
				isEditing: true,
				saveSuccess: action.saveSuccess,
                value: state.value,
                fromDraft: state.fromDraft,
				draftId: action.draftId
			};
        // case 'LOAD_DRAFT':
        //     return {
        //
        //     }
		default:
			return state;
	}
};

export default editReducer;