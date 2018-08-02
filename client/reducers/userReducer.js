
const userReducer = (state = {}, action) => {

	switch (action.type) {
		case 'USER_LOGIN':
		case 'USER_REGISTER':
		case 'USER_FETCH':
			return action.user;
        case 'USER_LOGOUT':
            return {};
		default:
			return state;
	}
};

export default userReducer;