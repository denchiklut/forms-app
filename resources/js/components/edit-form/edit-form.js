import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { fetchUpdateQuestion } from "../../actions/questions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { closeEditForm } from "../../actions/dialogs";
import './edit-form.scss'


class EditFormDialog extends Component {

    //Close Edit form
    handleCloseEdit = () => {
        this.props.closeEditForm(false)
    };

    //Send Edit Form
    handleEditSubmit = (e) => {
        e.preventDefault();
        const newMessage =  this.getEditMessage.value;
        const data = {...this.state.editItem, val: newMessage}
        this.props.editQuestion(data)
        this.getEditMessage.value = '';

        this.props.closeEditForm(false)
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
                        <DialogTitle className="form_heading">Редактирование {type}: {editItem ? editItem.id: ''}</DialogTitle>
                        <DialogContent className="form-container">
                            <textarea
                                autoFocus
                                required
                                rows="12"
                                cols="28"
                                ref={(input) => this.getEditMessage = input}
                                defaultValue={editItem ? editItem.val: ''}
                                placeholder="Enter Post" />
                            <br /><br />
                        </DialogContent>
                        <DialogActions className="control-buttons">
                            <Button onClick={this.handleCloseEdit} className="delete">
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

function mapStateToProps(state) {
    return {
        isOpen: state.showEditDialog
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            editQuestion: fetchUpdateQuestion,
            closeEditForm: closeEditForm,
        }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EditFormDialog);
