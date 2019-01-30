import React from 'react';
import Questions from "./Questions";
import About from "./About";
import Example from './Example'


import {Switch, Route} from 'react-router-dom'

const Main = () => (
    <Switch>
        <Route exact path="/" component={Example} />
        <Route path="/questions" component={Questions} />
        <Route path="/about" component={About} />
    </Switch>
);

export default Main;
