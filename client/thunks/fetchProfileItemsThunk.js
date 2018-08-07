import axios from 'axios';
import URL from '../../info';

const fetchProfileItemsThunk = (username) => (dispatch) => {
    console.log('fetch profile', username);
    axios.get(URL + 'db/fetch/profile/items/' + username)
        .then((res) => {
            if (res.data.success) {
                console.log('fetch profile items success', res);
                dispatch({type: 'PROFILE_ITEMS_FETCH',
                    user: res.data.user,
                    drafts:res.data.drafts,
                    works:res.data.works});
                return;
            }
            console.log('fetch profile items failure', res);
        })
        .catch((err) => {
            console.log('fetch profile items failure error', err);
        })
};

export default fetchProfileItemsThunk;