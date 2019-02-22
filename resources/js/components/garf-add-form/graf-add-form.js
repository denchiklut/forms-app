import React, { Component } from 'react';
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import SelectProject from '../select-project';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import './graf-add-form.scss'
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withStyles} from "@material-ui/core";


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

class GrafAddForm extends Component {

    state = {
        value: 0,
        answer: '',
        addQst: {},
    }

    setAnswer = ( e ) => {
        this.setState({answer: e.target.value})
    }

    handleChange = ( event, value ) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const answer =  this.state.answer
        const addQst =  this.state.addQst
        const data = {
            answer: answer ,
            addQst: addQst,
            currentQstId: this.props.currentQst
        }
        this.props.onAdd(data)
        this.setState({answer: ''})
    }

    addFromSelect = (item) => {
        this.setState({addQst: item})
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
                    <form className="form">
                        <DialogTitle className="form_heading">Добавление Node</DialogTitle>
                        <DialogContent className="form-container">
                            <AppBar position="static" color="default">
                                <Tabs
                                    indicatorColor = "primary"
                                    textColor      = "primary"
                                    variant        = "fullWidth"
                                    value          = { this.state.value }
                                    onChange       = { this.handleChange }
                                >
                                    <Tab label="Вопрос" />
                                    <Tab label="Объект" />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis          = { theme.direction === 'rtl' ? 'x-reverse' : 'x' }
                                index         = { this.state.value }
                                onChangeIndex = { this.handleChangeIndex }
                            >
                                <TabContainer dir={theme.direction}>
                                    <div style={{width: '80%', margin: 'auto'}}>
                                        <input
                                            autoFocus
                                            required
                                            type        = "text"
                                            className   = "answerInput"
                                            placeholder = "Добавить ответ"
                                            onChange    = { this.setAnswer }
                                            value       = { this.state.answer }
                                        />
                                        <div style={{width: '80%', margin: 'auto'}}>
                                            <SelectProject
                                                type       = "questions"
                                                className  = "grafFormSelect"
                                                selectItem = { this.addFromSelect }
                                                items      = { this.props.questions }
                                            />
                                        </div>
                                    </div>
                                </TabContainer>

                                <TabContainer dir={theme.direction}>
                                    <div style={{width: '80%', margin: 'auto'}}>
                                        <input
                                            required
                                            type        = "text"
                                            className   = "answerInput"
                                            placeholder = "Добавить ответ"
                                            onChange    = { this.setAnswer }
                                            value       = { this.state.answer }
                                        />
                                        <div style={{width: '80%', margin: 'auto'}}>
                                            <SelectProject
                                                type       = "objects"
                                                className  = "grafFormSelect"
                                                selectItem = { this.addFromSelect }
                                                items      = { this.props.objects }
                                            />
                                        </div>
                                    </div>
                                </TabContainer>
                            </SwipeableViews>

                            <br /><br />
                        </DialogContent>
                        <DialogActions className="control-buttons">
                            <Button onClick={ this.props.onClose }  className="delete">
                                Отмена
                            </Button>
                            <Button onClick={ this.handleSubmit } className="edit">
                                Добавить
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(null,{ withTheme: true })(GrafAddForm);
