import axios from 'axios';
import URL from '../../info';

const registerThunk = (username, fname, lname, email, password) => (dispatch) => {
    axios.post(URL + 'auth/register', {
        email: email,
        fname: fname,
        lname: lname,
        username: username,
        password: password
    })
        .then((res) => {
            if (res.data.success) {
                console.log('register success', res);
                dispatch({type: 'USER_REGISTER', user:res.data.user});
                dispatch(push('/'));
                return;
            }
            console.log('register failure', res);
        })
        .catch((err) => {
            console.log('register error', err);
        })
};

export default registerThunk;