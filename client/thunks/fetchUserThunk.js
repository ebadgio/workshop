import axios from 'axios';
import URL from '../../info';

const fetchUserThunk = () => (dispatch) => {
    console.log('called fetch');
    axios.get(URL +'db/fetch/user')
        .then((res) => {
            if (res.data.success) {
                console.log('fetch user success', res);
                dispatch({type: 'USER_FETCH', user:res.data.user});
                return;
            }
            console.log('fetch user failure', res);
        })
        .catch((err) => {
            console.log('fetch user error', err);
        })
};

export default fetchUserThunk;