import {
   applyMiddleware,
   legacy_createStore as createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import rootReducer from '../state/reducers/index'

const initialState = {};

const middlewares = [thunk];


const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
