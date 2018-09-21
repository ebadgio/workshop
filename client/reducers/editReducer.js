const defaultState = {
    isEditing: false,
    isSaving: false,
    saveSuccess: true,
    fromDraft: false,
    draftId: '',
    title: '',
    value: '',
    types: [],
    topics: []
};
const editReducer = (state = defaultState, action) => {

	switch (action.type) {
        case 'LOAD_DRAFT_FAILURE':
        case 'OPEN_EDIT':
			return {
                ...state,
				isSaving: false,
				isEditing: true,
			};
        case 'NEW_DRAFT': {
            console.log('new draft');
            return {
                ...defaultState,
                isEditing: true
            };
        }
		case 'LOAD_DRAFT': {
			return {
                ...state,
                fromDraft: true,
                draftId: action.draft._id,
                title: action.draft.title,
                value: action.draft.content,
                types: [],
                topics: []
            }
		}
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