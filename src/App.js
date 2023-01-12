import React from 'react';
import { Provider } from 'react-redux';
import {
   combineReducers,
   applyMiddleware,
   legacy_createStore as createStore,
} from "redux";

import thunk from 'redux-thunk';
import { itemReducer } from './state/reducers/itemReducer';

const middlewares = [thunk];

const rootReducer = combineReducers({
  item: itemReducer,
});

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const App = () => {
  return (
    <Provider store={store}>       
      <div>App</div>
    </Provider>
  )
}

export default App;
