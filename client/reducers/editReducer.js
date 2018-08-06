
const editReducer = (state = {isEditing: false, isSaving: false, saveSuccess: true, draftId: ''}, action) => {

	switch (action.type) {
		case 'OPEN_EDIT':
			return {
				isSaving: false,
				isEditing: true,
				draftId: action.draftId
			}
		case 'CLOSE_EDIT':
			return {
				isSaving: false,
				isEditing: false
			}
		case 'START_SAVING':
			return {
				isSaving: true,
				isEditing: true,
				draftId: state.draftId
			}
		case 'DONE_SAVING':
			return {
				isSaving: false,
				isEditing: true,
				saveSuccess: action.saveSuccess,
				draftId: action.draftId
			}
		default:
			return state;
	}
};

export default editReducer;