import React, {Component} from 'react'
import Dialog from "@material-ui/core/Dialog"
import { Editor } from '@tinymce/tinymce-react'
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import PropTypes from "prop-types"
import { Field, reduxForm } from 'redux-form'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Toolbar from "@material-ui/core/Toolbar"
import {compose} from "recompose"

import SwipeView from "../swipe-view"
import {tinyConfig, tinyMceKEY} from "../../consts"
import './add-object.scss'

class AddObject extends Component {
    state = {
        dopInformation: "<p>Дополнительная информация</p>",
    }

    onValueChange = (e) => {
        this.setState({dopInformation: e.target.getContent()})
    }

    extractContent = (s, space) => {
        let span = document.createElement('span')
        span.innerHTML= s
        if(space) {
            let children= span.querySelectorAll('*')
            for(let i = 0 ; i < children.length ; i++) {
                if(children[i].textContent)
                    children[i].textContent+= ' '
                else
                    children[i].innerText+= ' '
            }
        }
        return [span.textContent || span.innerText].toString().replace(/ +/g,' ');
    }

    onSubmit = ( formProps ) => {
        if (this.validate(formProps))
        this.props.onAdd( {...formProps, dopInformation: this.extractContent(this.state.dopInformation),  webDopInformation: this.state.dopInformation} )
    }

    validate = (formProps) => {
        if(!formProps.name) {
            alert("Поле  Название обязательно для заполнения");
            return false
        }
        return true;
    }

    renderInput = ({ input, placeHolder }) => {
        return (
            <input
                {...input}
                className  = "answerInput"
                placeholder={ placeHolder }
            />
        )
    }

    renderTextArea = () =>  {
        return (
            <div className="wrap-myeditor">
                <Editor
                    // apiKey={tinyMceKEY}
                    init={ tinyConfig }
                    onChange={this.onValueChange}
                />
            </div>
        )
    }

    componentDidMount() {
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
                    open={this.props.isOpen}
                    aria-labelledby="draggable-dialog-title"
                    className="addObject"

                >
                    <AppBar position="static"  style={{background: 'linear-gradient(45deg, #7221f3 30%, #d321f3 90%)'}}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                Создание обьекта
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <DialogContent className="form-container">

                            <SwipeView lables={['Главная', 'Дополнительно']}>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={6} style={{paddingBottom: 0}}>
                                        <Field name="name"     component = { this.renderInput } placeHolder="Название" />
                                        <Field name="location" component = { this.renderInput } placeHolder="Направление" />
                                        <Field name="cost"     component = { this.renderInput } placeHolder="Стоимость" />
                                    </Grid>

                                    <Grid item xs={12} sm={6} style={{paddingBottom: 0}}>
                                        <Field name="time"    component = { this.renderInput } placeHolder="Срок сдачи"/>
                                        <Field name="otdelka" component = { this.renderInput } placeHolder="Отделка"/>
                                        <Field name="view"    component = { this.renderInput } placeHolder="Вид недвижимости"/>
                                    </Grid>
                                </Grid>
                                {this.renderTextArea()}
                            </SwipeView>

                        </DialogContent>
                        <DialogActions className="control-buttons">
                            <Button onClick={this.props.onClose}  className="delete">
                                Отмена
                            </Button>
                            <Button type="submit" className="edit">
                                Добавить
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}
AddObject.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};
export default compose(withMobileDialog(), reduxForm({ form: 'objectCreate' })) (AddObject);
