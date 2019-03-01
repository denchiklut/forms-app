import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import { Field, reduxForm } from 'redux-form'
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {compose} from "recompose";
import './add-object.scss'


function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 0 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};


class AddObject extends Component {
    state = {
        value: 0,
    }

    handleChange = ( event, value ) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    onSubmit = ( formProps ) => {
        this.props.onAdd( formProps )
    }

    renderInput({ input, placeHolder }) {
        return (
            <input
                {...input}
                className  = "answerInput"
                placeholder={ placeHolder }
            />
        )
    }

    renderTextArea({ input, placeHolder }) {
        return (
            <div>
               <textarea
                   {...input}
                   rows        = "12"
                   cols        = "28"
                   placeholder = { placeHolder }
               />
            </div>
        )
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
                    className="form-container"

                >
                    <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <DialogTitle className="form_heading"> Создание обьекта </DialogTitle>
                        <DialogContent className="form-container">
                            <AppBar position="static" color="default">
                                <Tabs
                                    indicatorColor = "primary"
                                    textColor      = "primary"
                                    variant        = "fullWidth"
                                    value          = { this.state.value }
                                    onChange       = { this.handleChange }
                                >
                                    <Tab label="Главная" />
                                    <Tab label="Дполнительно" />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis          = "x"
                                index         = { this.state.value }
                                onChangeIndex = { this.handleChangeIndex }
                            >
                                <TabContainer dir="ltr">
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
                                </TabContainer>

                                <TabContainer dir="ltr">
                                    <Field name="dopInformation" component = { this.renderTextArea } placeHolder="Дополнительная информация"/>
                                </TabContainer>
                            </SwipeableViews>

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
