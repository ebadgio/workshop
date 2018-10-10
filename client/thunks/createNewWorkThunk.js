import axios from 'axios';
import URL from '../../info';

const createNewWorkThunk = (author, title, content, type, topics, description,draftId) => (dispatch) => {

    const headers = {
        author: author,
        title: title,
        content: content,
        type: type,
        description: description,
        topics: topics,
        draftId: draftId
    };

    axios.post(URL + 'db/create/work', headers)
        .then((res) => {
            if (res.data.success) {
                console.log('create work success', res);
                dispatch({type: 'WORK_CREATED', work: res.data.work});
                return;
            }
            console.log('save work failure', res);
            dispatch({type: 'CREATE_FAILED', work: res.data.work});
        })
        .catch((err) => {
            console.log('save work error', err);
            dispatch({type: 'CREATE_FAILED'});
        })
};

export default createNewWorkThunk;