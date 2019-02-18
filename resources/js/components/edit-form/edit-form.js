import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import './edit-form.scss'


class EditFormDialog extends Component {

    state = {
        value: '',
    }

    onValueChange = (e) => {
        this.setState({value: e.target.value})
    }

    handleEditSubmit = (e) => {
        e.preventDefault();
        const newMessage =  this.state.value;
        const data = {...this.props.editItem, value: newMessage}
        this.props.onEdit(data)
        this.setState({value: ''})
    }

    componentDidMount() {
        this.setState({value: this.props.editItem.value})
    }

    render() {
        const { editItem, type } = this.props

        return (
            <div>
                <Dialog
                    open={this.props.isOpen}
                    fullWidth={true}
                    maxWidth="lg"
                    aria-labelledby="draggable-dialog-title"
                    className="form-container"
                >
                    <form className="form">
                        <DialogTitle className="form_heading">Редактирование {type}: {editItem._id}</DialogTitle>
                        <DialogContent className="form-container">
                            <textarea
                                autoFocus
                                required
                                rows="12"
                                cols="28"
                                onChange={this.onValueChange}
                                value={ this.state.value }
                                placeholder="Enter Post"
                            />
                            <br /><br />
                        </DialogContent>
                        <DialogActions className="control-buttons">
                            <Button onClick={this.props.onClose} className="delete">
                                Отмена
                            </Button>
                            <Button onClick={this.handleEditSubmit} className="edit">
                                Изменить
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}
export default EditFormDialog;
