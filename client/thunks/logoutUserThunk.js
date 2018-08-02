import axios from 'axios';
import { push } from 'react-router-redux';
import URL from '../../info';

const logoutUserThunk = () => (dispatch) => {
    axios.get(URL + 'auth/logout')
        .then((res) => {
            if (res.data.success) {
                console.log('logout success', res);
                dispatch({type: 'USER_LOGOUT'});
                dispatch(push('/'));
                return;
            }
            console.log('logout failure', res);
        })
        .catch((err) => {
            console.log('logout error', err);
        })
};

export default logoutUserThunk;