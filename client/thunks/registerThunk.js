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
            console.log('register success', res);
        })
        .catch((err) => {
            console.log('register error', err);
        })
};

export default registerThunk;