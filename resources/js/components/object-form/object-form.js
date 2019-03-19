import React, {Component} from 'react'
import {connect} from "react-redux"
import Grid from "@material-ui/core/Grid"
import { Field, reduxForm } from 'redux-form'
import { Editor } from '@tinymce/tinymce-react'
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"

import {tinyConfig} from "../../consts"
import SwipeView from "../swipe-view"
import './object-form.scss'

class ObjectForm extends Component {
    state = {
        dopInformation: '',
    }

    onValueChange = (e) => {
        this.setState({dopInformation: e.target.getContent()})
    }

    extractContent = (s, space) => {
        let span = document.createElement('span');
        span.innerHTML= s;
        console.log(span)
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

    onSubmit = ( formProps ) => {
        this.props.onAdd( {...formProps, dopInformation: this.extractContent(this.state.dopInformation),  webDopInformation: this.state.dopInformation} )
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

    renderTextArea() {
        return (
            <div className="wrap-myeditor">
                <Editor
                    // apiKey={tinyMceKEY}
                    initialValue = "Дополнительная информация"
                    init={ tinyConfig }

                    onChange={this.onValueChange}
                />
            </div>
        )
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form">
                <DialogContent className="form-container">
                    <SwipeView lables={['Главная', 'Дполнительно']}>
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

        );
    }
}
ObjectForm = reduxForm({ form: 'objectCreate'})( ObjectForm )
ObjectForm = connect()(ObjectForm)
export default  ObjectForm
