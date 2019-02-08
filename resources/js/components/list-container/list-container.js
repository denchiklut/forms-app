import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import Divider from '@material-ui/core/Divider';
import {fetchAddQuestion, fetchDeleteQuestion, fetchUpdateQuestion, selectQuestion} from '../../actions/questions'
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import './list-container.scss'
import {compose} from "recompose";
import classNames from 'classnames';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = {
    selected: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)!important',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    selectedColor: {
        color: 'white!important'
    },
    list: {
        paddingTop: 0,
    }
}


class ListContainer extends Component {
    state = {
        selectedIndex: null,
        open: false,
        openEdit: false,
        editItem: null
    }

    //Open Add form
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    //Close Add form
    handleClose = () => {
        this.setState({ open: false });
    };

    //Open Edit form
    handleClickOpenEdit = (item) => {
        this.setState({ openEdit: true });
        this.setState({ editItem: item });
    };

    //Close Edit form
    handleCloseEdit = () => {
        this.setState({ openEdit: false });
    };

    //Select Item in list
    handleListItemClick = (event, item) => {
        this.setState({selectedIndex: item.id})
        this.props.select(item)
    }

    //Choose what to Add (Question / Object)
    handleAddItemClick = () => {
        switch (this.props.type) {
            case "question":
                this.handleClickOpen()
                break
            case "object":
                this.handleClickOpen()
                break
        }
    }

    //Choose what to Edit (Question / Object)
    handleEditItemClick = (item) => {
        switch (this.props.type) {
            case "question":
                this.handleClickOpenEdit(item)
                break
            case "object":
                this.handleClickOpenEdit()
                break
        }
    }

    //Send Add Form
    handleSubmit = (e) => {
        e.preventDefault();
        const message =  this.getMessage.value;
        const data = {
            editing: false,
            val: message
        }
        this.props.addQuestion(data)
        this.getMessage.value = '';
        this.setState({ open: false });
    }

    //Send Edit Form
    handleEditSubmit = (e) => {
        e.preventDefault();
        const newMessage =  this.getEditMessage.value;
        const data = {...this.state.editItem, val: newMessage}
        this.props.editQuestion(data)
        this.getEditMessage.value = '';
        this.setState({ openEdit: false });
    }

    render() {
        const { classes } = this.props;

        if ( this.props.items.length === 0 ) {
            return(
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{height: 'calc(100vh - 64px - 48px)', borderRight: '1px solid #0e0e0e24', background: '#e0e0e091'}}
                >
                    <Grid item xs={12}>
                        <div style={{width: '70%', margin: 'auto'}}>
                            <div className="noList" >
                                <h1 className="noMsg">There is nothing yet </h1>
                            </div>
                        </div>

                    </Grid>

                </Grid>

            )
        }
        return (
            <div className="myList">
                <List className={classes.list} component="nav">
                    {this.props.items.map((item) => (
                        <div
                            key={item.id}
                            className={classNames("myListItem", (item.id === this.state.selectedIndex) && classes.selected)}>
                            <ListItem
                                button
                                selected={item.id === this.state.selectedIndex}
                                onClick={event => this.handleListItemClick(event, item)}
                                style={{padding: "15px 8px"}}
                            >
                                <ListItemText
                                    disableTypography
                                    primary={<Typography type="body2" className={classNames(item.id === this.state.selectedIndex && classes.selectedColor)} >{item.val}</Typography>}
                                />

                                <ListItemSecondaryAction>
                                    <IconButton
                                        aria-label="Edit"
                                        onClick={() => this.handleEditItemClick(item)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="Delete"
                                        onClick={()=>this.props.delQuestion(item)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
                <Fab size="medium"
                     color="secondary"
                     aria-label="Add"
                     className="myAdd"
                     onClick={event => this.handleAddItemClick(event)}
                     style={{position: "absolute", bottom: "24px", right: "22px"}}>
                    <AddIcon />
                </Fab>

                {/*//Add dialog form*/}
                <Dialog
                    fullWidth={true}
                    maxWidth="lg"
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="draggable-dialog-title"
                    className="form-container"

                >
                    <form className="form">
                        <DialogTitle className="form_heading">Добавление {this.props.type}</DialogTitle>
                        <DialogContent className="form-container">
                            <textarea
                                autoFocus
                                required
                                rows="12"
                                cols="28"
                                ref={(input) => this.getMessage = input}
                                placeholder="Enter Post"
                            />
                            <br /><br />
                        </DialogContent>
                        <DialogActions className="control-buttons">
                            <Button onClick={this.handleClose}  className="delete">
                                Отмена
                            </Button>
                            <Button onClick={this.handleSubmit} className="edit">
                                Добавить
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                {/*//Edit dialog form*/}
                <Dialog
                    open={this.state.openEdit}
                    onClose={this.handleClose}
                    fullWidth={true}
                    maxWidth="lg"
                    aria-labelledby="draggable-dialog-title"
                    className="form-container"
                >
                    <form className="form">
                        <DialogTitle className="form_heading">Редактирование {this.props.type}: {this.state.editItem ? this.state.editItem.id: ''}</DialogTitle>
                        <DialogContent className="form-container">
                            <textarea
                                autoFocus
                                required
                                rows="12"
                                cols="28"
                                ref={(input) => this.getEditMessage = input}
                                defaultValue={this.state.editItem ? this.state.editItem.val: ''}
                                placeholder="Enter Post" />
                            <br /><br />
                        </DialogContent>
                        <DialogActions className="control-buttons">
                            <Button onClick={this.handleCloseEdit} className="delete">
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
ListContainer.propTypes = {
    items: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
};


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            select: selectQuestion,
            addQuestion: fetchAddQuestion,
            delQuestion: fetchDeleteQuestion,
            editQuestion: fetchUpdateQuestion
        },
        dispatch)
}

export default compose(withStyles(styles), connect(null, matchDispatchToProps))(ListContainer);
