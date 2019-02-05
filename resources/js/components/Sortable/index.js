import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import Divider from '@material-ui/core/Divider';
import {fetchAddQuestion, fetchDeleteQuestion, fetchUpdateQuestion, selectQuestion} from '../../actions'
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
import Paper from '@material-ui/core/Paper';
import './index.scss'
import Draggable from 'react-draggable';

function PaperComponent(props) {
    return (
        <Paper {...props} />
    );
}

class Sortable extends Component {
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
        return (
            <div style={{position: 'relative'}}>
                <List className="myList" component="nav">
                {this.props.items.map((item) => (
                  <div  key={item.id}>
                      <ListItem
                          button
                          selected={item.id === this.state.selectedIndex}
                          onClick={event => this.handleListItemClick(event, item)}
                          style={{padding: "15px 8px"}}
                      >
                          <ListItemText primary={item.val}/>
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
                    open={this.state.open}
                    onClose={this.handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <form>
                        <DialogTitle id="draggable-dialog-title">Добавление {this.props.type}</DialogTitle>
                        <DialogContent>
                            <textarea
                                autoFocus
                                id="name"
                                ref={(input) => this.getMessage = input}
                            />
                            <br /><br />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Отмена
                            </Button>
                            <Button onClick={this.handleSubmit} color="primary">
                                Добавить
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                {/*//Edit dialog form*/}
                <Dialog
                    open={this.state.openEdit}
                    onClose={this.handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <form>
                        <DialogTitle id="draggable-dialog-title">Редактирование {this.props.type} ID: {this.state.editItem ? this.state.editItem.id: ''}</DialogTitle>
                        <DialogContent>
                            <textarea
                                autoFocus
                                required rows="5"
                                ref={(input) => this.getEditMessage = input}
                                defaultValue={this.state.editItem ? this.state.editItem.val: ''}
                                placeholder="Enter Post" />
                            <br /><br />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseEdit} color="primary">
                                Отмена
                            </Button>
                            <Button onClick={this.handleEditSubmit} color="primary">
                                Изменить
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }

}
Sortable.propTypes = {
    items: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
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

export default connect(null, matchDispatchToProps)(Sortable);
