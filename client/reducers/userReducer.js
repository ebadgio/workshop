// TODO: concatanate works and drafts
const userReducer = (state = {
    fetching: true,
}, action) => {

	switch (action.type) {
		// case 'FETCHING_USER':
		case 'USER_LOGIN':
		case 'USER_REGISTER':
		case 'USER_FETCH':
			return action.user;
        case 'USER_LOGOUT':
            return {};
		case 'USER_DRAFTS_FETCH':
			return {
				...state,
				drafts: action.drafts
			};
        case 'USER_WORKS_FETCH':
            return {
                ...state,
                works: action.works
            };
		default:
			return state;
	}
};

export default userReducer;