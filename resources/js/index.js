import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {HashRouter} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import {Provider} from "react-redux";
import allReducers from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(
    allReducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    ));


ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>,
    document.getElementById('root'));
