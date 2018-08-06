
const editReducer = (state = {isEditing: false}, action) => {

	switch (action.type) {
		case 'OPEN_EDIT':
			return {isEditing: true}
		case 'CLOSE_EDIT':
			return {isEditing: false}
		default:
			return state;
	}
};

export default editReducer;