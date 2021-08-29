import React, { StrictMode } from "react";
import ReactDOM  from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import "./index.css"
import reducers from "./reducers/index";
import App  from "./App";

const store = createStore(reducers,{},compose(applyMiddleware(thunk)));

ReactDOM.render(
    <StrictMode>
    <Provider store={store}>  
        <App />
    </Provider></StrictMode>,
    document.getElementById("root")
)