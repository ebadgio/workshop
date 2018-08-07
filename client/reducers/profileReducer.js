const profileReducer = (state = {
    user: {},
    works: []
}, action) => {

	switch (action.type) {
        case 'PROFILE_ITEMS_FETCH':
            return {
                user: action.user,
                works: action.works
            }
		default:
			return state;
	}
};

export default profileReducer;