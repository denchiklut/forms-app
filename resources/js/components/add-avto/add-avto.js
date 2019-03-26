import React, {Component} from 'react'
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Button from "@material-ui/core/Button"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import { Editor } from '@tinymce/tinymce-react'
import Typography from "@material-ui/core/Typography"
import {tinyConfig, tinyMceKEY} from "../../consts"
import {Field, FieldArray, reduxForm, Fields} from 'redux-form'
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SwipeView from "../swipe-view";
import {compose} from "recompose";
import './add-avto.scss'


class AddAvto extends Component {
    state = {
        dopInformation: '',
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

    onValueChange = (e) => {
        this.setState({dopInformation: e.target.getContent()})
    }

    renderFieldName = ({ input, placeHolder }) => <input {...input} placeholder={placeHolder} className = "nameInput"/>

    renderTextArea = () => {
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

    renderField = ({ input, placeHolder }) => {
        return(
            <input {...input} placeholder={placeHolder} className  = "answerInput"/>
        )
    }

    renderRows = ({ fields }) => {
        // console.log(fields)
        return(
            <div>
                <div className="inputContainer">
                    <Field
                        name="name"
                        type="text"
                        component={this.renderFieldName}
                        placeHolder="name"
                    />
                </div>

                <table>
                    <thead>
                    <tr>
                        <th>Модель</th>
                        <th>Стоимость</th>
                        <th>Выгода</th>
                        <th>Условия</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fields.map((member, index) => (
                        <tr key={index}>
                            <td>
                                <Field
                                    name={`${member}.name`}
                                    type="text"
                                    component={this.renderField}
                                    placeHolder="Модель"
                                />
                            </td>
                            <td>
                                <Field
                                    name={`${member}.cost`}
                                    type="text"
                                    component={this.renderField}
                                    placeHolder="Стоимость"
                                />
                            </td>
                            <td>
                                <Field
                                    name={`${member}.benefit`}
                                    type="text"
                                    component={this.renderField}
                                    placeHolder="Выгода"
                                />
                            </td>
                            <td>
                                <Field
                                    name={`${member}.conditions`}
                                    type="text"
                                    component={this.renderField}
                                    placeHolder="Условия"
                                />
                            </td>
                            <td >
                                {index ===  0 ?
                                    <Fab size="small" color="secondary" aria-label="Add" className="btnRow" onClick={() => fields.push({})}>
                                        <AddIcon />
                                    </Fab>:
                                    <Fab size="small" color="primary" aria-label="Delit" className="btnRow" onClick={() => fields.remove(index)}>
                                        <DeleteIcon />
                                    </Fab>}

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }

    onSubmit = ( formProps ) => {
        this.props.onAdd( {...formProps, dopInformation: this.extractContent(this.state.dopInformation),  webDopInformation: this.state.dopInformation} )
    }

    componentDidMount() {
        setTimeout(() => document.querySelectorAll('[tabindex="-1"]').forEach(item => item.removeAttribute('tabindex')), 1000)
    }

    render() {
        const { fullScreen } = this.props;

        return (
            <div >
                <Dialog
                    fullWidth  = { true }
                    maxWidth   = { false }
                    fullScreen = { fullScreen }
                    open       = { this.props.isOpen }
                    className="addAvto"

                >
                    <AppBar position="static"  style={{background: 'linear-gradient(to right, #dc2430, #7b4397)'}}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                Добавление авто
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <DialogContent className="form-container">
                            <SwipeView lables={['Главная', 'Дополнительно']}>
                                <FieldArray name="members" component={this.renderRows}/>
                                {this.renderTextArea()}
                            </SwipeView>
                        </DialogContent>
                        <DialogActions className="control-buttons">
                            <Button onClick={this.props.onClose}  className="delete">
                                Отмена
                            </Button>
                            <Button type="submit"  className="edit">
                                Добавить
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default compose(withMobileDialog(), reduxForm({ form: 'avtoCreate' , enableReinitialize : true, initialValues: {members: [{}]} })) (AddAvto);
