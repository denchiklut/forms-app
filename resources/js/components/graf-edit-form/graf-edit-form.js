import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import withMobileDialog from '@material-ui/core/withMobileDialog';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import './graf-edit-form.scss'

class GrafEditForm extends Component {

    state = {
        value: '',
    }

    onValueChange = (e) => {
        this.setState({value: e.target.value})
    }

    handleEditSubmit = (e) => {
        e.preventDefault();
        const newMessage =  this.state.value;
        this.props.onEdit({...this.props.item, answer: newMessage})
        this.setState({value: ''})
    }

    componentDidMount() {
        this.setState({value: this.props.item.answer})
    }

    render() {
        const { fullScreen } = this.props;

        return (
            <div>
                <Dialog
                    fullWidth  = { true }
                    maxWidth   = { false }
                    fullScreen = { fullScreen }
                    open       = { this.props.isOpen }
                    className="grafEditForm"

                >
                    <AppBar position="static" style={{background: 'linear-gradient(to right, #536976, #292e49)'}}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit"
                            >
                                Edit answer
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <form className="form">
                        <DialogContent className="form-container">
                            <input
                                autoFocus
                                className   = "answerInput"
                                placeholder = "Введите ответ"
                                value       = { this.state.value }
                                onChange    = { this.onValueChange }
                            />
                        </DialogContent>
                        <DialogActions className="control-buttons">
                            <Button onClick={this.props.onClose}  className="delete">
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

export default withMobileDialog()(GrafEditForm);
