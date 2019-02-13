import React, { Component } from 'react';
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import SelectProject from '../select-project';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import './graf-add-form.scss'


class GrafAddForm extends Component {

    state = {
        val: '',
        val1: '',
        val2: '',
        val3: '',
        addQst: {},
        answer: null
    }

    onValueChange = (e) => {
        this.setState({val: e.target.value})
    }
    onValueChange1 = (e) => {
        this.setState({val1: e.target.value})
    }
    onValueChange2 = (e) => {
        this.setState({val2: e.target.value})
    }
    onValueChange3 = (e) => {
        this.setState({val3: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const message1 =  this.state.val1
        const message2 =  this.state.val2
        const message3 =  this.state.val3
        const answer =  this.state.answer
        const addQst =  this.state.addQst
        const data = {
            val1: message1,
            val2: message2,
            val3: message3,
            answer: answer ,
            addQst: addQst,
            currentQstId: this.props.currentQst
        }
        this.props.onAdd(data)
        this.setState({val: '', val1: '', val2: '', val3: ''})
    }

    addFromSelect = (item) => {
        this.setState({addQst: item})
    }

    setAnswer = ( e ) => {
        this.setState({answer: e.target.value})
    }

    renderRadio = ( item ) => {
        return (
            <div style={{display: 'flex', flexGrow: 1}} key={item}>
                <label>
                    <input
                        name="answer"
                        type="radio"
                        value={ item }
                        onClick={this.setAnswer}
                    />{' '}
                    { item }
                </label>

            </div>
        )
    }


    render() {
        return (
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth="lg"
                    open={this.props.isOpen}
                    aria-labelledby="draggable-dialog-title"
                    className="form-container"

                >
                    <form className="form">
                        <DialogTitle className="form_heading">Добавление Node</DialogTitle>
                        <DialogContent className="form-container">

                            <div style={{width: '80%', margin: 'auto'}}>
                                <SelectProject
                                    className="grafFormSelect"
                                    items={ this.props.questions }
                                    selectItem={ this.addFromSelect }
                                />

                                <div style={{display: 'flex'}}>
                                    { this.props.answers.answer.map(item => this.renderRadio(item)) }
                                </div>


                                <input
                                    className="answerInput"
                                    required
                                    type="text"
                                    placeholder="Добавить ответ"
                                    onChange={this.onValueChange1}
                                    value={ this.state.val1 }
                                />
                                <input
                                    className="answerInput"
                                    required
                                    type="text"
                                    placeholder="Добавить ответ"
                                    onChange={this.onValueChange2}
                                    value={ this.state.val2 }
                                />
                                <input
                                    className="answerInput"
                                    required
                                    type="text"
                                    placeholder="Добавить ответ"
                                    onChange={ this.onValueChange3 }
                                    value={ this.state.val3 }
                                />

                            </div>



                            <br /><br />
                        </DialogContent>
                        <DialogActions className="control-buttons">
                            <Button onClick={ this.props.onClose }  className="delete">
                                Отмена
                            </Button>
                            <Button onClick={ this.handleSubmit } className="edit">
                                Добавить
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default GrafAddForm;
