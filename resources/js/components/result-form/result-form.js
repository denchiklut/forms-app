import React, {Component} from 'react';
import {connect} from "react-redux";
import './result-form.scss'
import {bindActionCreators} from "redux";
import {fetchNodes} from "../../actions/graf/nodes";
import Fab from "@material-ui/core/Fab";


class ResultForm extends Component {

    state = {
        questionList: [],
    }

     findNodes = (answer, newData) => {
        let i, j, currentChild

        if (newData.answer === answer) {

            let answers = []
            for (i= 0; i < newData.children.length; i++) {
                answers.push(newData.children[i].answer)
            }

            this.setState(prevState => ({
                questionList: [...prevState.questionList, {question: newData.name, answers: answers}]
            }))
        }

        for (j = 0; j < newData.children.length; j ++) {
            currentChild = newData.children[j];
            this.findNodes(answer, currentChild);
        }
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
        console.log(this.state.questionList)
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
                                    onClick={() => this.findNodes(item, this.props.nodes)}
                                >
                                    {item}
                                </Fab>
                            )}
                        </div>
                    )

                    : null}
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
