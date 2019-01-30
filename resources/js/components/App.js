import React, {Component} from 'react';
import {Content, Drawer, Header, Layout, Navigation} from "react-mdl";
import Main from "./Main";
import {Link} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import allReducers from "../reducers";


const store = createStore(allReducers);


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div style={{minHeight: '100vh', position: 'relative'}}>
                    <Layout fixedHeader>
                        <Header className={'header-color'} title={<Link style={{textDecoration: 'none', color: 'white'}} to='/'>Editor</Link>} scroll>
                            <Navigation>
                                <Link to="/questions">Questions</Link>
                                <Link to="/about">about</Link>
                            </Navigation>
                        </Header>
                        <Drawer title={<Link style={{textDecoration: 'none', color: 'black'}} to='/'>Editor</Link>} >
                            <Navigation>
                                <Link to="/questions">Questions</Link>
                                <Link to="/about">about</Link>
                            </Navigation>
                        </Drawer>
                        <Content>
                            <Main />
                        </Content>
                    </Layout>
                </div>
            </Provider>
        );
    }
}

export default App
