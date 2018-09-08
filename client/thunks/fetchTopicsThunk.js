import axios from 'axios';
import URL from '../../info';

const fetchTopicsThunk = () => (dispatch) => {
    axios.get(URL + 'db/fetch/topics/all')
        .then((res) => {
            if (res.data.success) {
                console.log('fetch topics success', res);
                dispatch({type:'FETCH_TOPICS', topics: res.data.topics});
                return;
            }
            console.log('fetch topics failure', res);
        })
        .catch((err) => {
            console.log('fetch topics error', err);
        })
};

export default fetchTopicsThunk;