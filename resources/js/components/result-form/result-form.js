import React, {Component} from 'react'
import uuid from "uuid"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import Fab from "@material-ui/core/Fab"
import InsertComment from '@material-ui/icons/InsertComment'

import {fetchProjects, selectProject} from "../../actions/projects"
import {signIn, signOut} from '../../actions/auth/google'
import {fetchNodes} from "../../actions/graf/nodes"

import ResultItem from './result-item'
import HeaderBar from '../header-bar'
import './result-form.scss'

import Dialog from "@material-ui/core/Dialog"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from '@material-ui/icons/Close'
import Slide from "@material-ui/core/Slide";

const Transition = props => <Slide direction="up" {...props} />

class ResultForm extends Component {

    state = {
        questionList: [],
        lastNode: null,
        isOpen: false
    }

    findNodes = (answer, lastNode, clickedNode) => {
        //Проверяем если кликнули на ответ По вопросу выше последнего
        if (clickedNode.idd !== lastNode.idd && (clickedNode.children.indexOf(lastNode) === -1)) {

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

        lastNode.children.map( node => {

                if (node.answer === answer) {
                    let answers = []

                    for (let i= 0; i < node.children.length; i++) {

                        if (node.children[i].answer) answers.push(node.children[i].answer)
                    }

                    this.setState(prevState => ({
                        questionList: [ ...prevState.questionList, { ...node, answers: answers }],
                        lastNode: { ...node }
                    }))
                }

            }
        )
    }

    drawKaskad = (first, next) => {

        let idx = this.state.questionList.indexOf(first);
        let arrK = [...this.state.questionList];


        let answers = []
        next.children.map( node => {
            answers.push(node.answer)
        })


        let arr = [...arrK.splice(0, idx), first, {...next, answers: answers}]

        this.setState({
            questionList: arr,
            lastNode: { ...next }
        })

    }

    openDopInfo = () => {
        this.setState({isOpen: true})
    }

    handleClose = () => {
        this.setState({isOpen: false})
    }

    renderDopInformation = item => {
        let span = document.createElement('span');
        span.innerHTML= item;

        const rawMarkup = () => {
            let rawMarkup = span.innerHTML
            return { __html: rawMarkup };
        }

        return  <span dangerouslySetInnerHTML={rawMarkup()} />

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

        if (document.querySelector('.answerCard:last-child')) document.querySelector('.answerCard:last-child').scrollIntoView()

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

                    <Fab
                        color="secondary"
                        size="small"
                        aria-label="Play"
                        className="dopick"
                        onClick = { this.openDopInfo }
                    >
                        <InsertComment fontSize="small" />
                    </Fab>

                    {questionList.length !== 0 ? questionList.map(item =>
                        <ResultItem
                            currentNode  = { item }
                            key          = { uuid.v4() }
                            onNext       = { this.findNodes }
                            onKaskad     = { this.drawKaskad }
                            lastNode     = { this.state.lastNode }
                        />) : null}
                </div>

                <Dialog
                    fullScreen
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar position="static" >
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div>
                      <pre style={{ whiteSpace: 'pre-wrap', margin: '15px'}}>
                          {this.props.nodes.dopInformation ? this.renderDopInformation(this.props.nodes.dopInformation.webValue) : null }
                      </pre>
                    </div>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = ({activeProject, nodes, projects, auth}) => {
    return { activeProject, nodes, projects,  auth }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchNodes, fetchProjects, selectProject, signIn, signOut }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ResultForm)
