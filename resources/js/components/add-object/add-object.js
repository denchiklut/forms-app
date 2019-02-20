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
import {withStyles} from "@material-ui/core";
import './add-object.css'


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
        val: ''
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    onValueChange = (e) => {
        this.setState({val: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const message =  this.state.val
        const project = this.props.project
        const data = {
            value: message,
            project: project
        }
        this.props.onAdd(data)
        this.setState({val: ''})
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
                                axis          = { theme.direction === 'rtl' ? 'x-reverse' : 'x' }
                                index         = { this.state.value }
                                onChangeIndex = { this.handleChangeIndex }
                            >
                                <TabContainer dir={theme.direction}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={6} style={{paddingBottom: 0}}>
                                            <input
                                                autoFocus
                                                required
                                                type        = "text"
                                                className   = "answerInput"
                                                placeholder = "Название"
                                                value       = { this.state.val }
                                                onChange    = { this.onValueChange }
                                            />
                                            <input
                                                required
                                                type        = "text"
                                                className   = "answerInput"
                                                placeholder = "Расположение"
                                                value       = { this.state.val }
                                                onChange    = { this.onValueChange }
                                            />
                                            <input
                                                required
                                                type        = "text"
                                                className   = "answerInput"
                                                placeholder = "Стоимость"
                                                value       = { this.state.val }
                                                onChange    = { this.onValueChange }
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6} style={{paddingBottom: 0}}>
                                            <input
                                                required
                                                type        = "text"
                                                className   = "answerInput"
                                                placeholder = "Срок сдачи"
                                                value       = { this.state.val }
                                                onChange    = { this.onValueChange }
                                            />
                                            <input
                                                required
                                                type        = "text"
                                                className   = "answerInput"
                                                placeholder = "Отделка"
                                                value       = { this.state.val }
                                                onChange    = { this.onValueChange }
                                            />
                                            <input
                                                required
                                                type        = "text"
                                                className   = "answerInput"
                                                placeholder = "Вид"
                                                value       = { this.state.val }
                                                onChange    = { this.onValueChange }
                                            />
                                        </Grid>

                                    </Grid>
                                </TabContainer>

                                <TabContainer dir={theme.direction}>
                                    <textarea
                                        required
                                        rows="12"
                                        cols="28"
                                        onChange={this.onValueChange}
                                        placeholder="Дополнительная информация"
                                        value={this.state.val}
                                    />
                                </TabContainer>
                            </SwipeableViews>

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

export default withStyles(null,{ withTheme: true })(AddObject);
