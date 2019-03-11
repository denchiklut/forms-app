import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchNodes} from "../../actions/graf/nodes";
import Fab from "@material-ui/core/Fab";
import ResultObject from '../result-object'
import './result-form.scss'

class ResultForm extends Component {

    state = {
        questionList: [],
        currentChild: null,
        kaskad: [],
    }

    findNodes = (answer, newData) => {
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.activeProject !== this.props.activeProject) {
            this.props.history.push(`/play/${this.props.activeProject.value}`)
            this.props.fetchNodes(this.props.activeProject.value)
        }
    }

    componentDidMount() {
        let newData = {...this.props.nodes}
        this.findNodes("start", newData)
    }

    renderObj = (item) => {
        let arr,
            lastObj = {}, kaskad = [], kaskadAnswers = []

        const findKaskad = (newData) => {
            let i, currentChild

            //Если с реди потомков узла есть хотябы один вопрос - это НЕ КАСКАД
            if (newData.type === "questions") return true
            //Находим потомков типа - ОБЪЕКТ
            if (newData.type === "objects") {
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

            //Ищем рекурсивно в потомках объекты
            for (i = 0; i < newData.children.length; i++) {
                currentChild = newData.children[i];
                findKaskad(currentChild);
            }
        }

        findKaskad(item)

        if (kaskad.length !== 0) {
            arr = [...kaskad]
            kaskad = []
        } else {
            arr = [item]
        }


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
                        onClick={() => this.findNodes(item, lastObj)}
                    >
                        {item}
                    </Fab>)}
            </div>
        )
    }

    render() {
        return (
            <div className="ResultForm">
                {this.state.questionList !== 0 ?
                    this.state.questionList.map(item =>
                        <div key={item.idd}>

                            { item.type === "objects" ? this.renderObj(item) :
                                <>
                                    <p key={item.idd}>{item.value}</p>
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
        );
    }
}

function mapStateToProps(state) {
    return {
        activeProject: state.activeProject,
        nodes: state.nodes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchNodes: fetchNodes,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultForm);
