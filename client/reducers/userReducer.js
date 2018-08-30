// TODO: concatanate works and drafts
const userReducer = (state = {}, action) => {

	switch (action.type) {
		case 'USER_LOGIN':
		case 'USER_REGISTER':
		case 'USER_FETCH':
			return action.user;
        case 'USER_LOGOUT':
            return {};
		case 'USER_WORKS_FETCH':
			return {
				...state,
				works: action.works,
				drafts: action.drafts
			};
		default:
			return state;
	}
};

export default userReducer;