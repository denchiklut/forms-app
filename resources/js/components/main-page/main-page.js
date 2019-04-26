import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from "redux"

import {connect} from 'react-redux'
import {fetchQuestions} from '../../actions/questions'
import {fetchProjects, selectProject} from "../../actions/projects"
import {fetchNodes, onAddNode, onRemoveNode, selectNode,} from "../../actions/graf/nodes"
import {fetchObjects} from "../../actions/objects"

import ResizablePanels from "../resizable-panels";
import {fetchAvto} from "../../actions/avto"
import ShowNode from '../show-node'
import ListContainer from '../list-container'
import SwipeView from "../swipe-view"
import HeaderBar from "../header-bar"
import GrafD3 from '../graf-d3'
import './main-page.scss'
import {fetchAddBackup, fetchbackups, fetchRestore} from "../../actions/backaup";


class MainPage extends Component {

    state = {
        client : false
    }

    renderSwipe = () => {
        if (this.state.client) {
            return(
                <SwipeView lables={['Просмотр']}>
                    <ShowNode node={this.props.activeNode} />
                </SwipeView>
            )
        } else {
            return(
                <SwipeView lables={['Вопросы', 'Жк', 'Авто', 'Просмотр']}>
                    <ListContainer items={this.props.questions} type="question" />
                    <ListContainer items={this.props.objects} type="object" />
                    <ListContainer items={this.props.avto} type="avto" />
                    <ShowNode       node={this.props.activeNode} />
                </SwipeView>
            )
        }
    }

    componentDidMount() {
        this.props.fetchObjects()
        this.props.fetchProjects()
        this.props.fetchAvto()

        if (window.location.href.indexOf("/#/share") !== -1) {
            this.setState({client: true})
            this.props.selectProject({value: this.props.match.params.project, label: this.props.match.params.project, type: "projects"})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeProject !== prevProps.activeProject) {
            this.props.fetchQuestions(this.props.activeProject.value)
            this.props.fetchNodes(this.props.activeProject.value)
        }

        if (this.props.questions !== prevProps.questions || this.props.objects !== prevProps.objects || this.props.avto !== prevProps.avto) {
            this.props.fetchNodes(this.props.activeProject.value)
        }

        if (window.location.href.indexOf("/#/share") === -1) {
            if (this.props.auth.isSignedIn === false) {
                this.props.history.push("/login");
            }
        }
    }

    restore = async data => {

        await this.props.fetchRestore(data)
        this.props.fetchQuestions(this.props.activeProject.value)
        this.props.fetchObjects()
        this.props.fetchAvto()
    }

    render() {
        const { nodes, onAddNode, questions, objects,  avto, onRemoveNode, activeProject, selectNode, fetchAddBackup, fetchbackups, backup, auth } = this.props
        return (
            <>
                <HeaderBar
                    projects      = { this.props.projects }
                    selectProject = { this.props.selectProject }
                />

                <div>
                    <ResizablePanels>
                        { this.renderSwipe() }
                        <GrafD3
                            auth          = { auth }
                            avto          = { avto }
                            grafNodes     = { nodes }
                            backups       = { backup }
                            objects       = { objects }
                            questions     = { questions }
                            onAddNode     = { onAddNode }
                            showNode      = { selectNode }
                            getBackups    = { fetchbackups }
                            removeNode    = { onRemoveNode }
                            onResore      = { this.restore }
                            project       = { activeProject }
                            activeProject = { activeProject }
                            onAddBackup   = { fetchAddBackup }
                        />
                    </ResizablePanels>
                </div>
            </>
        );
    }
}

const  mapStateToProps = ({projects, questions, objects, activeProject, nodes, avto, activeNode, auth, backup}) => {
    return { projects, questions, objects, activeProject, nodes, avto, activeNode, auth, backup }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchProjects,
                                                            selectProject,
                                                            fetchObjects,
                                                            onRemoveNode,
                                                            fetchNodes,
                                                            onAddNode,
                                                            fetchQuestions,
                                                            fetchAvto,
                                                            selectNode,
                                                            fetchAddBackup,
                                                            fetchbackups,
                                                            fetchRestore}, dispatch)

MainPage.propTypes = {
    activeProject:  PropTypes.object.isRequired,
    questions:      PropTypes.array.isRequired,
    avto:           PropTypes.array.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

