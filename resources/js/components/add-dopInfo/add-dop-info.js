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
import './add-dopinfo.scss'

class AddDopInfo extends Component {

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

    handleSubmit = (e) => {
        e.preventDefault();
        const message =  this.state.value
        const clearMsg = this.extractContent(this.state.value)

        const data = {
            value:    clearMsg,
            webValue: message,
        }

        this.props.onAdd(data)
        this.setState({value: ''})
    }


    componentDidMount() {
        this.setState({value: this.props.value.webValue})
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
                    className="addForm"

                >
                    <AppBar position="static"  style={{background: 'linear-gradient(to right, #dc2430, #7b4397)'}}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                Доп информация по проекту <span className="pr_name">{`${this.props.project}`}</span>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <form className="form">
                        <DialogContent className="form-container">
                            <Editor
                                // apiKey={tinyMceKEY}
                                cloudChannel='dev'
                                value = {this.state.value}
                                init={ tinyConfig }
                                onChange={this.onValueChange}
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

export default withMobileDialog()(AddDopInfo) ;

