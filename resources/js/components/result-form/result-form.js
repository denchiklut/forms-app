import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchProjects, selectProject} from "../../actions/projects";
import {bindActionCreators} from "redux";
import {fetchNodes} from "../../actions/graf/nodes";
import Fab from "@material-ui/core/Fab";
import ResultObject from '../result-object'
import HeaderBar from '../header-bar'
import uuid from "uuid"
import './result-form.scss'

class ResultForm extends Component {

    state = {
        questionList: [],
        currentChild: null,
        kaskad: [],
    }

    prevItem = null
    prevObj = null

    findNodes = (answer, newData) => {
        if (newData.children) {
            newData.children.map(
                item => {
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
                }
            )
        }
    }

    handleClick = (item, lastObj) => {
        if (item !== this.prevItem && lastObj !== this.prevObj ) {
            this.findNodes(item, lastObj)
            this.prevItem = item
            this.prevObj = lastObj
        }

    }

    renderObj = (item) => {

        let arr = [], lastObj = {}, kaskad = [], kaskadAnswers = []

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
            if (newData.type === "objects" ) {

                //Добавляем в массив каскад Объект
                kaskad.push(newData)
                //Текущем узлом (нужен для поиска потомков по ответу) делаем найденный обьект
                lastObj = newData
                //Находим все ответы текущего объекта
                for (i = 0; i < lastObj.children.length; i++) {
                    //Добавляем ответы в массив ответов (У одного объекта может быть несколько потомков)
                    if (lastObj.children[i].answer) kaskadAnswers.push(lastObj.children[i].answer)
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

        kaskad.length !== 0 ? arr = [...kaskad] : arr = [item]

        return(
            <div>
                <ResultObject items={arr} />
                {kaskadAnswers.map(item =>
                    <Fab
                        key={item}
                        size="small"
                        color="primary"
                        variant="extended"
                        aria-label=" answer"
                        style={{margin: "auto 5px", padding: "0 15px"}}
                        onClick={() => this.handleClick(item, lastObj)}
                    >
                        {item}
                    </Fab>)}
            </div>
        )
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
        this.props.fetchProjects()
        this.props.fetchNodes(this.props.activeProject.value ? this.props.activeProject.value : this.props.match.params.project )
    }

    render() {
        return (
            <>
                {this.props.auth.isSignedIn ?
                    <HeaderBar
                        projects      = { this.props.projects }
                        selectProject = { this.props.selectProject }
                    />: null}

                <div className="ResultForm">
                    {this.state.questionList !== 0 ?
                        this.state.questionList.map(item =>
                            <div key={uuid.v4()}>

                                { item.type === "objects" ? this.renderObj(item) :
                                    <>
                                        <p>{item.value}</p>
                                        { item.answers.map(item =>
                                            <Fab
                                                key={item}
                                                size="small"
                                                color="primary"
                                                variant="extended"
                                                aria-label=" answer"
                                                style={{margin: "auto 5px", padding: "0 15px"}}
                                                onClick={() => this.findNodes(item, this.state.currentChild)}
                                            >
                                                {item}
                                            </Fab>
                                        )}
                                    </>
                                }

                            </div>
                        ): null}
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeProject: state.activeProject,
        nodes: state.nodes,
        projects: state.projects,
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchNodes: fetchNodes,
        fetchProjects: fetchProjects,
        selectProject: selectProject,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultForm);
