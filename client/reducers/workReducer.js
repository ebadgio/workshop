
const workReducer = (state = {
    success: true,
    work: {}
}, action) => {

    switch (action.type) {
        case 'WORK_CREATED':
            return {
                success: true,
                work: action.work
            };
        case 'CREATE_FAILURE':
            return {
                success: false,
                work: {}
            };
        default:
            return state;
    }
};

export default workReducer;