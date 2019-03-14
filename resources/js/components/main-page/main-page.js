import React, { Component } from 'react';
import ListContainer from '../list-container';
import Grid from '@material-ui/core/Grid';
import GrafD3 from '../graf-d3';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {fetchQuestions} from '../../actions/questions'
import {bindActionCreators} from "redux";
import {fetchNodes, onAddNode, onRemoveNode,} from "../../actions/graf/nodes";
import {fetchObjects} from "../../actions/objects";
import './main-page.scss'
import HeaderBar from "../header-bar";
import {fetchProjects, selectProject} from "../../actions/projects";

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 0 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

class MainPage extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    componentDidMount() {
        this.props.fetchObjects()
        this.props.fetchProjects()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeProject !== prevProps.activeProject &&  Object.keys(this.props.activeProject).length !== 0) {
            this.props.fetchQuestions(this.props.activeProject.value)
            this.props.fetchNodes(this.props.activeProject.value)
        }
    }

    componentWillReceiveProps( nextProps ) {
        if((nextProps.questions !== this.props.questions || nextProps.objects !== this.props.objects) && (Object.keys(nextProps.nodes ).length !== 0)) {
            this.props.fetchNodes(this.props.activeProject.value)
        }
    }

    render() {
        return (
            <>
                <HeaderBar
                    projects      = { this.props.projects }
                    selectProject = { this.props.selectProject }
                />
                <div style={{margin: '-3px'}}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6} md={3} style={{paddingBottom: 0}}>
                            <AppBar position="static" color="default">
                                <Tabs
                                    indicatorColor = "primary"
                                    textColor      = "primary"
                                    variant        = "fullWidth"
                                    value          = { this.state.value }
                                    onChange       = { this.handleChange }
                                >
                                    <Tab label="Вопросы" />
                                    <Tab label="Обьекты" />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis          = "x"
                                index         = { this.state.value }
                                onChangeIndex = { this.handleChangeIndex }
                            >
                                <TabContainer dir="ltr">
                                    <ListContainer items={this.props.questions} type="question" />
                                </TabContainer>
                                <TabContainer dir="ltr">
                                    <ListContainer items={this.props.objects} type="object" />
                                </TabContainer>
                            </SwipeableViews>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9} style={{paddingLeft: 0, paddingBottom: 0}}>
                            <GrafD3
                                grafNodes     = { this.props.nodes }
                                onAddNode     = { this.props.onAddNode }
                                questions     = { this.props.questions }
                                objects       = { this.props.objects }
                                removeNode    = { this.props.removeNode }
                                project       = { this.props.activeProject }
                                activeProject = { this.props.activeProject }
                            />
                        </Grid>
                    </Grid>
                </div>
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
        projects:      state.projects,
        questions:     state.questions,
        objects:       state.objects,
        activeProject: state.activeProject,
        nodes:         state.nodes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchProjects: fetchProjects,
        selectProject: selectProject,
        fetchQuestions: fetchQuestions,
        fetchObjects:   fetchObjects,
        removeNode:     onRemoveNode,
        fetchNodes:     fetchNodes,
        onAddNode:      onAddNode,
    }, dispatch)
}



MainPage.propTypes = {
    activeProject:  PropTypes.object.isRequired,
    questions:      PropTypes.array.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

