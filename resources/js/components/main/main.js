import React from 'react';
import MainPage from '../main-page'


import {Switch, Route} from 'react-router-dom'

const Main = () => (
    <Switch>
        <Route exact path="/" component={MainPage} />
    </Switch>
);

export default Main;
