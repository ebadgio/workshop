import axios from 'axios';
import URL from '../../info';

const fetchWorksThunk = (id) => (dispatch) => {
    // console.log('fetch drafts', id);
    axios.get(URL + 'db/fetch/works/' + id)
        .then((res) => {
            if (res.data.success) {
                console.log('fetch works success', res);
                dispatch({type: 'USER_WORKS_FETCH', drafts:res.data.drafts, works: res.data.wordBreak});
                return;
            }
            console.log('fetch works failure', res);
        })
        .catch((err) => {
            console.log('fetch works error', err);
        })
};

export default fetchWorksThunk;