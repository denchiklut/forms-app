import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main'
import {fetchProjects, selectProject} from '../../actions/projects'
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import HeaderBar from '../header-bar'
import './app.scss'

class App extends React.Component {

    componentDidMount() {
        this.props.fetchProjects()
    }

    render() {

        return (
            <div className='App'>
                <HeaderBar
                    projects      = { this.props.projects }
                    selectProject = { this.props.selectProject }
                />
                <main className="main">
                    <div className='appBarSpacer' />
                    <Main />
                </main>
            </div>
        );
    }
}

App.propTypes = {
    fetchProjects: PropTypes.func.isRequired,
    selectProject: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        projects: state.projects,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchProjects: fetchProjects,
        selectProject: selectProject
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
