import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import './add-form.scss'

class AddForm extends Component {

    state = {
        value: '',
    }

    onValueChange = (e) => {
        this.setState({value: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const message =  this.state.value
        const project = this.props.project
        const data = {
            editing: false,
            value: message,
            project: project
        }
        this.props.onAdd(data)
        this.setState({value: ''})
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
                        <DialogTitle className="form_heading">Добавление {this.props.type}</DialogTitle>
                        <DialogContent className="form-container">
                            <textarea
                                autoFocus
                                required
                                rows="12"
                                cols="28"
                                onChange={this.onValueChange}
                                placeholder="Enter Post"
                                value={this.state.value}
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

export default AddForm;
