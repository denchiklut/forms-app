import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import withMobileDialog from '@material-ui/core/withMobileDialog';
import './graf-edit-form.scss'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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
        const data = {...this.props.editItem, name: newMessage}
        this.props.onEdit(data)
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
                    className="form-container"

                >
                    <AppBar position="static" className="grafAppBar">
                        <Toolbar>
                            <Typography variant="h6" >
                                Edit answer
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <form className="form">
                        <DialogContent className="form-container">
                            <input
                                autoFocus
                                required
                                className  = "answerInput"
                                placeholder= "Enter Post"
                                value      = { this.state.value }
                                onChange   ={ this.onValueChange }
                            />
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

export default withMobileDialog()(GrafEditForm);
