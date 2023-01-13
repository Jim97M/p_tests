import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./state/store";
import { Provider } from "react-redux";

const appElement = document.getElementById("app");
ReactDOM.render(
 <Provider store={store}>
   <App/>
   </Provider>
, appElement);
