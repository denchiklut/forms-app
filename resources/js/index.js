import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {HashRouter} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import {Provider} from "react-redux";
import rootReducers from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(
    rootReducers,
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
