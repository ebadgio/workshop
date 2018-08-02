import axios from 'axios';
import { push } from 'react-router-redux';
import URL from '../../info';

const loginThunk = (email, password) => (dispatch) => {
    console.log(email, password)
    axios.post(URL + 'auth/login', {
        email: email,
        password: password
    })
        .then((res) => {
            if (res.data.success) {
                console.log('login success', res);
                dispatch({type: 'USER_LOGIN', user:res.data.user});
                dispatch(push('/'));
                return;
            }
            console.log('login failure', res);
        })
        .catch((err) => {
            console.log('login error', err);
        })
};

export default loginThunk;