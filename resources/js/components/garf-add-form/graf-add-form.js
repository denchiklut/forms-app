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
        answer: '',
        addQst: {},
    }

    setAnswer = ( e ) => {
        this.setState({answer: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const answer =  this.state.answer
        const addQst =  this.state.addQst
        const data = {
            answer: answer ,
            addQst: addQst,
            currentQstId: this.props.currentQst
        }
        this.props.onAdd(data)
        this.setState({answer: ''})
    }

    addFromSelect = (item) => {
        this.setState({addQst: item})
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

                                <input
                                    autoFocus
                                    required
                                    type        = "text"
                                    className   = "answerInput"
                                    placeholder = "Добавить ответ"
                                    onChange    = { this.setAnswer }
                                    value       = { this.state.answer }
                                />
                                <div style={{width: '80%', margin: 'auto'}}>
                                    <SelectProject
                                        className  = "grafFormSelect"
                                        selectItem = { this.addFromSelect }
                                        items      = { this.props.questions }
                                    />
                                </div>

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
