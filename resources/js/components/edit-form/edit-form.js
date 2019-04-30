import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Editor } from '@tinymce/tinymce-react';
import Typography from "@material-ui/core/Typography";
import {tinyConfig, tinyMceKEY} from "../../consts";
import './edit-form.scss'

class EditFormDialog extends Component {

    state = {
        value: '',
    }

    onValueChange = (e) => {
        this.setState({value: e.target.getContent()})
    }

    extractContent = (s, space) => {
        let span = document.createElement('span');
        span.innerHTML= s;
        if(space) {
            let children= span.querySelectorAll('*');
            for(let i = 0 ; i < children.length ; i++) {
                if(children[i].textContent)
                    children[i].textContent+= ' ';
                else
                    children[i].innerText+= ' ';
            }
        }
        return [span.textContent || span.innerText].toString().replace(/ +/g,' ');
    }

    handleEditSubmit = (e) => {
        e.preventDefault();
        const newMessage =  this.state.value.length !== 0 ? this.state.value : "<p>Вопрос</p>";
        const clearMsg = this.state.value.length !== 0 ? this.extractContent(this.state.value): "Вопрос"

        const data = {...this.props.editItem, name: clearMsg, webName: newMessage}
        this.props.onEdit(data)
        this.setState({value: ''})
    }

    componentDidMount() {
        this.setState({value: this.props.editItem.webName})
        setTimeout(() => document.querySelectorAll('[tabindex="-1"]').forEach(item => item.removeAttribute('tabindex')), 1000)
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
                    className  = "editFormDialog"
                >
                    <AppBar position="static"  style={{background: 'linear-gradient(to right, #dc2430, #7b4397)'}}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                Редактирование вопроса
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <form className="form">
                        <DialogContent className="form-container">
                            <Editor
                                // apiKey={tinyMceKEY}
                                initialValue = { this.state.value }
                                init={ tinyConfig }
                                onChange={this.onValueChange}
                            />
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
export default withMobileDialog()(EditFormDialog);
