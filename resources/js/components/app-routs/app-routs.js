import React from 'react';
import MainPage from '../main-page'
import LoginPage from "../login-page"
import ResultForm from '../result-form'
import {Switch, Route} from 'react-router-dom'

const AppRouts = () => (
    <Switch>
        <Route exact path="/"         component = { MainPage } />
        <Route path="/login"          component = { LoginPage } />
        <Route path="/share/:project" component = { MainPage } />
        <Route path="/play/:project"  component = { ResultForm } />
    </Switch>
);

export default AppRouts;
