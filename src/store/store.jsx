import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer.jsx';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// abcd@gmail.com
// Ajay@1234