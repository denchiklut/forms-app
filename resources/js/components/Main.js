import React from 'react';
import Settings from "./Settings";
import About from "./About";
import Example from './Example'


import {Switch, Route} from 'react-router-dom'

const Main = () => (
    <Switch>
        <Route exact path="/" component={Example} />
        <Route path="/settings" component={Settings} />
        <Route path="/about" component={About} />
    </Switch>
);

export default Main;
