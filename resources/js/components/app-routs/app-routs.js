import React from 'react';
import MainPage from '../main-page'
import ResultForm from '../result-form'
import {Switch, Route} from 'react-router-dom'

const AppRouts = () => (
    <Switch>
        <Route exact path="/"         component = { MainPage } />
        <Route path="/share/:project" component = { MainPage } />
        <Route path="/play/:project"  component = { ResultForm } />
    </Switch>
);

export default AppRouts;
