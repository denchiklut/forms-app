import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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
            name: message,
            project: project
        }
        this.props.onAdd(data)
        this.setState({value: ''})
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
                    className="addForm"

                >
                    <AppBar position="static"  style={{background: 'linear-gradient(to right, #dc2430, #7b4397)'}}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                Добавление вопроса
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <form className="form">
                        <DialogContent className="form-container">
                            <textarea
                                autoFocus
                                rows="12"
                                cols="28"
                                onChange={this.onValueChange}
                                placeholder="Enter Post"
                                value={this.state.value}
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

export default withMobileDialog()(AddForm) ;
