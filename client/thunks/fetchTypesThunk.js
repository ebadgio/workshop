import axios from 'axios';
import URL from '../../info';

const fetchTypesThunk = () => (dispatch) => {
    axios.get(URL + 'db/fetch/types')
        .then((res) => {
            if (res.data.success) {
                console.log('fetch types success', res);
                dispatch({type:'FETCH_TYPES', types: res.data.types});
                return;
            }
            console.log('fetch types failure', res);
        })
        .catch((err) => {
            console.log('fetch types error', err);
        })
};

export default fetchTypesThunk;