import { SET_ALERT, CLEAR_ALERT } from '../utils/actionTypes';
export const initialState = {
    alertInfo: {
        open: false,
        severity: "",
        message: ""
    }
};

const userReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch(action.type){
        case SET_ALERT:
            newState.alertInfo = action.payload;
            break;
        case CLEAR_ALERT:
            newState.alertInfo = initialState.alertInfo;
            break;
        default:
            break;
    }
    return newState;
}

export default userReducer;