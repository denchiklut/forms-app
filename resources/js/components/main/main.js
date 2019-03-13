import React from 'react';
import MainPage from '../main-page'
import ResultForm from '../result-form'
import {Switch, Route} from 'react-router-dom'

const Main = () => (
    <Switch>
        <Route exact path="/"        component = { MainPage } />
        <Route path="/play/:project" component = { ResultForm } />
    </Switch>
);

export default Main;
