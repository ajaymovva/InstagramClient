import  api  from '../api/axios';
import { PATHS } from '../api/config';
import { showSuccessAlert } from './utilActions';

export const getUserDetails = async (userId) => {
    const response = await api.get(`${PATHS.getUserDetails}/${userId}`, true);
    if(response && response.data && response.data.success){
        return response.data.success;
    }
    return {};
}

export const followUserAction = async (followId, dispatch) => {
    const response = await api.post(PATHS.followUser,{followId}, true);
    if(response && response.data && response.data.success){
        const result = response.data.success.followingUser;
        dispatch({type: 'UPDATE_USER',payload: result.following });
        localStorage.setItem('', JSON.stringify(result));
        return response.data.success;
    }
}

export const unFollowUserAction = async (followId, dispatch) => {
    const response = await api.post(PATHS.unFollowUser,{followId}, true);
    if(response && response.data && response.data.success){
        const result = response.data.success.followingUser;
        dispatch({type: 'UPDATE_USER',payload: result.following });
        localStorage.setItem('', JSON.stringify(result));
        return response.data.success;
    }
}

export const logOutAction = (dispatch, history) => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    localStorage.removeItem('jwt');
    sessionStorage.removeItem('jwt');
    dispatch( {type : 'CLEAR_USER'});
    dispatch(showSuccessAlert("Successfully logout"))
    history.push('/signin');
}
