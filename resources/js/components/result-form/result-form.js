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
        currentChild: null
    }


    findNodes = (answer, lastNode, clickedNode) => {
        console.log(clickedNode)

        if (!clickedNode) clickedNode = lastNode
        let idx = null

        if (this.state.questionList.length !== 0) {

            if (this.state.questionList[this.state.questionList.length - 1].value !== clickedNode.value) {

                this.state.questionList.filter((item, index) => {
                    if (item.value === clickedNode.value)  {
                        idx = index
                    }
                })

                if (idx !== null) {
                    let prevList = [...this.state.questionList]
                    let newList = prevList.slice(0, idx + 1)

                    this.setState(
                        {questionList: newList, currentChild: { ...newList[newList.length-1] }},
                        () => this.findNodes(answer, this.state.currentChild, this.state.currentChild)
                    )
                }

            }

        }

        if (lastNode.children) {
            lastNode.children.map(
                item => {
                    let  kaskad = [], kaskadAnswers = []

                    const findAnswer = (data) => {
                        for (let i = 0; i < data.children.length; i++) {

                            if (data.children[i].answer) {
                                return false // false: ЕСТЬ ОТВЕТЫ
                            }
                        }
                        return true //true: НЕТ ответов
                    }

                    const findKaskad = (newData) => {
                        let i, currentChild

                        //Если с реди потомков узла есть хотябы один вопрос - это НЕ КАСКАД
                        if (newData.type === "questions") return true
                        //Находим потомков типа - ОБЪЕКТ
                        if (newData.type === "objects" || newData.type === "avto") {

                            //Добавляем в массив каскад Объект
                            kaskad.push(newData)
                            //Текущем узлом (нужен для поиска потомков по ответу) делаем найденный обьект
                            currentChild = newData

                            //Находим все ответы текущего объекта
                            for (i = 0; i < currentChild.children.length; i++) {
                                //Добавляем ответы в массив ответов (У одного объекта может быть несколько потомков)
                                if (currentChild.children[i].answer) kaskadAnswers.push(currentChild.children[i].answer)
                            }
                        }


                        if (findAnswer(newData)) { // ЕСЛИ НЕТ ОТВЕТОВ КАСКАД!
                            //Ищем рекурсивно в потомках объекты
                            for (i = 0; i < newData.children.length; i++) {
                                currentChild = newData.children[i];

                                findKaskad(currentChild);
                            }
                        }
                    }

                    findKaskad(item)

                    if (kaskad.length < 2) {
                        if (item.answer === answer) {
                            let answers = []

                            for (let i= 0; i < item.children.length; i++) {
                                answers.push(item.children[i].answer)
                            }

                            this.setState(prevState => ({
                                questionList: [ ...prevState.questionList, {...item, answers: answers}],
                                currentChild: { ...item }
                            }))
                        }
                    } else {
                        this.setState(prevState => ({
                            questionList: [ ...prevState.questionList, {...item, answers: kaskadAnswers, lost: {...kaskad[0]}}],
                            currentChild: { ...item }
                        }))
                    }

                }
            )
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.activeProject !== this.props.activeProject) {
            this.setState({questionList: [], currentChild: null, kaskad: [] })
            this.props.history.push(`/play/${this.props.activeProject.value}`)
            this.props.fetchNodes(this.props.activeProject.value)
        }

        if (prevProps.nodes !== this.props.nodes) {
            this.findNodes("start", this.props.nodes)
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
                            item         = { item }
                            key          = { uuid.v4() }
                            onNext       = { this.findNodes }
                            currentChild = { this.state.currentChild }
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
