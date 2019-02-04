import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import Divider from '@material-ui/core/Divider';
import {fetchAddQuestion, selectQuestion} from '../../actions'
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
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleListItemClick = (event, item) => {
        this.setState({selectedIndex: item.id})
        this.props.select(item)
    }

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

    showInput = (e) => {
        console.log(e.target.value)
    }

    render() {
        return (
            <div style={{position: 'relative'}}>
                <List component="nav" style={{minHeight: "50vh", overflow: "scroll", paddingBottom: 0, paddingTop: 0}}>
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
                              <IconButton aria-label="Delete">
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
            addQuestion: fetchAddQuestion
        },
        dispatch)
}

export default connect(null, matchDispatchToProps)(Sortable);
