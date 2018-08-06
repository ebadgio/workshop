import axios from 'axios';
import URL from '../../info';

const saveDraftThunk = (author, title, content, draftId) => (dispatch) => {
    
    // Will cause the editor to display 'saving...'
    dispatch({type: 'START_SAVING'});

    const sendTitle = title ? title : 'Untitled Draft';

    const headers = {
        author: author,
        title: sendTitle,
        draftId: draftId,
        content: content
    }

    axios.post(URL + 'db/save/draft', headers)
        .then((res) => {
            if (res.data.success) {
                console.log('save draft success', res);
                dispatch({type: 'DONE_SAVING', saveSuccess: true, draftId: res.data.draftId});
                return;
            }
            console.log('save draft failure', res);
            dispatch({type: 'DONE_SAVING', saveSuccess: false});
        })
        .catch((err) => {
            console.log('save draft error', err);
            dispatch({type: 'DONE_SAVING', saveSuccess: false});
        })
};

export default saveDraftThunk;