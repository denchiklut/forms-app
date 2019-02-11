import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import SelectProject from '../select-project'
import './graf-add-form.scss'


class GrafAddForm extends Component {

    state = {
        val: '',
        addQst: {},
    }

    onValueChange = (e) => {
        this.setState({val: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const message =  this.state.val
        const addQst =  this.state.addQst
        const data = {
            editing: false,
            val: message,
            addQst: addQst
        }
        this.props.onAdd(data)
        this.setState({val: ''})
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
                            <SelectProject
                                className="grafFormSelect"
                                items={this.props.questions}
                                selectItem={ this.addFromSelect}
                            />
                            <textarea
                                autoFocus
                                required
                                rows="6"
                                cols="28"
                                onChange={this.onValueChange}
                                placeholder="Enter Post"
                                value={this.state.val}
                            />
                            <br /><br />
                        </DialogContent>
                        <DialogActions className="control-buttons">
                            <Button onClick={this.props.onClose}  className="delete">
                                Отмена
                            </Button>
                            <Button onClick={this.handleSubmit} className="edit">
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
