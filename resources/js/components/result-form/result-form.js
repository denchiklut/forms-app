import React, {Component} from 'react';
import {connect} from "react-redux";
import './result-form.scss'
import {bindActionCreators} from "redux";
import {fetchNodes} from "../../actions/graf/nodes";
import Fab from "@material-ui/core/Fab";


class ResultForm extends Component {

    state = {
        questionList: [],
        currentChild: null,
    }

    findNodes = (answer, newData) => {
        let i

        newData.children.map(
            item => {
                if (item.answer === answer) {

                    let answers = []
                    for (i= 0; i < item.children.length; i++) {
                        answers.push(item.children[i].answer)
                    }

                    this.setState(prevState => ({
                        questionList: [ ...prevState.questionList, {question: item.name, answers: answers}],
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

    render() {
        return (
            <div className="ResultForm">
                {this.state.questionList !==0 ?
                    this.state.questionList.map(item =>
                        <div key={item}>
                            <p>{item.question}</p>

                            {item.answers.map(item =>
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
