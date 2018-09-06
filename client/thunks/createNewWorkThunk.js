import axios from 'axios';
import URL from '../../info';

const createNewWorkThunk = (author, title, content, type, topics) => (dispatch) => {

    const headers = {
        author: author,
        title: title,
        content: content,
        type: type,
        topics: topics
    };

    axios.post(URL + 'db/create/work', headers)
        .then((res) => {
            if (res.data.success) {
                console.log('create work success', res);
                // dispatch({type: 'DONE_SAVING', saveSuccess: true, draftId: res.data.draftId});
                return;
            }
            console.log('save work failure', res);
            // dispatch({type: 'DONE_SAVING', saveSuccess: false});
        })
        .catch((err) => {
            console.log('save draft error', err);
            // dispatch({type: 'DONE_SAVING', saveSuccess: false});
        })
};

export default createNewWorkThunk;