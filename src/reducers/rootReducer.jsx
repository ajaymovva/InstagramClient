import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import utilReducer from '../reducers/utilReducer';

export default combineReducers({
    userReducer,
    utilReducer
});