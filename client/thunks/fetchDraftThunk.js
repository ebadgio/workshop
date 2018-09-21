import axios from 'axios';
import URL from '../../info';

const fetchDraftThunk = (draftId) => (dispatch) => {
    // console.log('fetch drafts', id);
    axios.get(URL + 'db/fetch/draft/' +draftId)
        .then((res) => {
            if (res.data.success) {
                console.log('fetch draft success', res);
                dispatch({type: 'LOAD_DRAFT', draft: res.data.draft});
                return;
            }
            dispatch({type: 'LOAD_DRAFT_FAILURE'});
            console.log('fetch draft failure', res);
        })
        .catch((err) => {
            console.log('fetch draft error', err);
        })
};

export default fetchDraftThunk;