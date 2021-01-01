import { SET_USER, CLEAR_USER, UPDATE_FOLLOWING } from '../utils/actionTypes';
export const initialState = {
    user: null,
    isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch(action.type){
        case SET_USER:
            newState.user = action.payload;
            newState.isAuthenticated = true;
            break;
        case UPDATE_FOLLOWING:
            newState.user.following = action.payload || [];
            break;
        case CLEAR_USER:
            newState.user = null;
            newState.isAuthenticated = false;
            break;
        default:
            break;
    }
    return newState;
}

export default userReducer;