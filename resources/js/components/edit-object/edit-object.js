import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from '@material-ui/core/Typography';
import {fetchLoad} from "../../actions/edit-object";
import SwipeableViews from 'react-swipeable-views';
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from 'redux-form'
import AppBar from '@material-ui/core/AppBar';
import {withStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import {bindActionCreators} from "redux";
import Tab from '@material-ui/core/Tab';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import './edit-object.scss'

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



class EditObject extends Component {
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
        const data = {...this.props.editItem, value: formProps, name: formProps.name}

        this.props.onEdit( data )
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

    componentDidMount() {
        this.props.load(this.props.editItem.value)
    }

    render() {
        const { theme } = this.props;

        return (
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth="lg"
                    open={this.props.isOpen}
                    aria-labelledby="draggable-dialog-title"
                    className="form-container"

                >
                    <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <DialogTitle className="form_heading"> Редактирование обьекта </DialogTitle>
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
                                axis          = { theme.direction === 'rtl' ? 'x-reverse' : 'x' }
                                index         = { this.state.value }
                                onChangeIndex = { this.handleChangeIndex }
                            >
                                <TabContainer dir={theme.direction}>
                                    <Button type="button" onClick={() => this.props.load(this.props.editItem.value) }>Load Account</Button>
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

                                <TabContainer dir={theme.direction}>
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



function mapStateToProps(state) {
    return {
        initialValues: state.editObjects,

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        load: fetchLoad,
    }, dispatch)
}


EditObject = reduxForm({ form: 'objectEdit', enableReinitialize : true })( EditObject );
EditObject = connect(mapStateToProps, mapDispatchToProps)(EditObject);

export default withStyles(null,{ withTheme: true })(EditObject);
