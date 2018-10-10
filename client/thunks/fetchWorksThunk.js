import axios from 'axios';
import URL from '../../info';

const fetchWorksThunk = (id, pageNum) => (dispatch) => {
    // console.log('fetch drafts', id);
    axios.get(URL + 'db/fetch/works/' + id + '?pageNum=' + pageNum)
        .then((res) => {
            if (res.data.success) {
                console.log('fetch works success', res);
                dispatch({type: 'USER_WORKS_FETCH', works:res.data.works});
                return;
            }
            console.log('fetch works failure', res);
        })
        .catch((err) => {
            console.log('fetch works error', err);
        })
};

export default fetchWorksThunk;