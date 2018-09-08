
const editReducer = (state = {isEditing: false,
	isSaving: false,
    saveSuccess: true,
    fromDraft: false,
    draftId: '',
    title: '',
    value: '',
    types: [],
    topics: []
}, action) => {

	switch (action.type) {
        case 'OPEN_EDIT':
			return {
				isSaving: false,
				isEditing: true,
				draftId: action.draftId,
                fromDraft: action.fromDraft,
                title: action.title,
                value: action.value,
                types: state.types,
                topics: state.topics
			};
        case 'CLOSE_EDIT':
			return {
                ...state,
				isSaving: false,
				isEditing: false
			};
        case 'START_SAVING':
			return {
                ...state,
				isSaving: true,
				isEditing: true,
			};
        case 'DONE_SAVING':
			return {
                ...state,
				isSaving: false,
				isEditing: true,
				saveSuccess: action.saveSuccess,
				draftId: action.draftId
			};
        case 'FETCH_TYPES':
            return {
                ...state,
                types: action.types
            };
		case 'FETCH_TOPICS':
			return {
				...state,
				topics: action.topics
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