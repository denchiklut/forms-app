import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import {bindActionCreators} from "redux"
import {connect} from 'react-redux'

import {fetchQuestions} from '../../actions/questions'
import {fetchProjects, selectProject} from "../../actions/projects"
import {fetchNodes, onAddNode, onRemoveNode,} from "../../actions/graf/nodes"
import {fetchObjects} from "../../actions/objects"

import ListContainer from '../list-container'
import GrafD3 from '../graf-d3'
import HeaderBar from "../header-bar"
import './main-page.scss'

class MainPage extends Component {
    state = {
        value: 0,
    }

    componentDidMount() {
        this.props.fetchObjects()
        this.props.fetchProjects()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeProject !== prevProps.activeProject) {
            this.props.fetchQuestions(this.props.activeProject.value)
            this.props.fetchNodes(this.props.activeProject.value)
        }

        if (this.props.questions !== prevProps.questions || this.props.objects !== prevProps.objects) {
            this.props.fetchNodes(this.props.activeProject.value)
        }

    }

    render() {
        const {nodes, onAddNode, questions, objects, onRemoveNode, activeProject, } = this.props
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
                                    onChange       = { (e, value) => this.setState({value}) }
                                >
                                    <Tab label="Вопросы" />
                                    <Tab label="Обьекты" />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis          = "x"
                                index         = { this.state.value }
                                onChangeIndex = { (e, index) => this.setState({ value: index }) }
                            >
                                <ListContainer items={this.props.questions} type="question" />
                                <ListContainer items={this.props.objects} type="object" />
                            </SwipeableViews>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9} style={{paddingLeft: 0, paddingBottom: 0}}>
                            <GrafD3
                                grafNodes     = { nodes }
                                onAddNode     = { onAddNode }
                                questions     = { questions }
                                objects       = { objects }
                                removeNode    = { onRemoveNode }
                                project       = { activeProject }
                                activeProject = { activeProject }
                            />
                        </Grid>
                    </Grid>
                </div>
            </>
        );
    }
}


const  mapStateToProps = ({projects, questions, objects, activeProject, nodes}) => {
    return { projects, questions, objects, activeProject, nodes }
}

const mapDispatchToProps = dispatch => bindActionCreators({fetchProjects, selectProject, fetchObjects, onRemoveNode, fetchNodes,onAddNode, fetchQuestions}, dispatch)

MainPage.propTypes = {
    activeProject:  PropTypes.object.isRequired,
    questions:      PropTypes.array.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

