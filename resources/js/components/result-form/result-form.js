import React, {Component} from 'react'
import uuid from "uuid"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import Fab from "@material-ui/core/Fab"
import {Link} from "react-router-dom"
import Cached from '@material-ui/icons/Cached'

import {fetchProjects, selectProject} from "../../actions/projects"
import {signIn, signOut} from '../../actions/auth/google'
import {fetchNodes} from "../../actions/graf/nodes"

import ResultItem from './result-item'
import HeaderBar from '../header-bar'
import './result-form.scss'


class ResultForm extends Component {

    state = {
        questionList: [],
        lastNode: null,
    }

    findNodes = (answer, lastNode, clickedNode) => {

        //Проверяем если кликнули на ответ По вопросу выше последнего
        if (clickedNode.idd !== lastNode.idd) {

            let idx = this.state.questionList.indexOf(clickedNode)
            let prevList = [...this.state.questionList]
            let newList = prevList.slice(0, idx + 1)

            clickedNode.children.map( item => {
                    if (item.answer === answer) {

                        let answers = []

                        for (let i= 0; i < item.children.length; i++) {
                            answers.push(item.children[i].answer)
                        }

                        this.setState({
                            questionList: [ ...newList, {...item, answers: answers}],
                            lastNode: { ...item }
                        })
                    }
                })
            return true
        }

        lastNode.children.map(
            node => {
                if (node.answer === answer) {
                    let answers = [], isKaskad = false
                    // let kaskadAnswers = [], kaskad =[]

                    for (let i= 0; i < node.children.length; i++) {

                        // if (!node.children[i].answer) {
                        //     isKaskad = true
                        //     kaskad.push(node, node.children[i])
                        //     for (let i= 0; i < kaskad[kaskad.length-1].children.length; i++) {
                        //         kaskadAnswers.push(kaskad[kaskad.length-1].children[i].answer)
                        //     }
                        // }

                        if (node.children[i].answer) answers.push(node.children[i].answer)
                    }

                    if (isKaskad) {
                        // this.setState(prevState => ({
                        //     questionList: [ ...prevState.questionList, {...kaskad[kaskad.length-1], answers: answers, isKaskad: isKaskad, kaskadAnswers: kaskadAnswers, kaskad: kaskad}],
                        //     lastNode: { ...kaskad[kaskad.length-1] }
                        // }))
                    } else {
                        this.setState(prevState => ({
                            questionList: [ ...prevState.questionList, {...node, answers: answers, isKaskad: isKaskad}],
                            lastNode: { ...node }
                        }))
                    }
                }

            }
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.activeProject !== this.props.activeProject) {
            this.setState({questionList: [], lastNode: null, kaskad: [] })
            this.props.history.push(`/play/${this.props.activeProject.value}`)
            this.props.fetchNodes(this.props.activeProject.value)
        }

        if (prevProps.nodes !== this.props.nodes) {
            this.findNodes("start", this.props.nodes, this.props.nodes)
        }
    }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '526406641065-dhd8ns8af28hqc2c6e082bof6qvhp786.apps.googleusercontent.com',
                scope: 'profile email'
            }).then(()=> {
                this.auth = window.gapi.auth2.getAuthInstance()

                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
        this.props.fetchProjects()
        this.props.fetchNodes(this.props.activeProject.value ? this.props.activeProject.value : this.props.match.params.project )
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            const profile = {
                userId: this.auth.currentUser.get().getBasicProfile().getId(),
                email:  this.auth.currentUser.get().getBasicProfile().getEmail(),
                avatar: this.auth.currentUser.get().getBasicProfile().getImageUrl(),
                name:   this.auth.currentUser.get().getBasicProfile().getName(),
            }
            this.props.signIn(profile)
        }else {
            this.props.signOut()
        }
    }

    render() {
        const {questionList} = this.state
        const { projects, selectProject } = this.props

        return (
            <div>
                {this.props.auth.isSignedIn ?
                    <HeaderBar
                        projects      = { projects }
                        selectProject = { selectProject }
                    />: null}

                <div className = "ResultForm">

                    <Link to={`/play/${this.props.activeProject.value ? this.props.activeProject.value : this.props.match.params.project}`}
                          style={{textDecoration: "none", color: "white"}}
                          className="myLink"
                          onClick={() => window.location.reload() }>
                        <Fab
                            color="secondary"
                            size="small"
                            aria-label="Play"
                            className="grafToolBarBtm"
                        >
                            <Cached fontSize="small" />
                        </Fab>
                    </Link>

                    {questionList.length !== 0 ? questionList.map(item =>
                        <ResultItem
                            currentNode  = { item }
                            key          = { uuid.v4() }
                            onNext       = { this.findNodes }
                            lastNode     = { this.state.lastNode }
                        />) : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({activeProject, nodes, projects, auth}) => {
    return { activeProject, nodes, projects,  auth }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchNodes, fetchProjects, selectProject, signIn, signOut }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ResultForm)
