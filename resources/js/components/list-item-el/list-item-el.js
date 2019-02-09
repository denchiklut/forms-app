import React, {Component} from 'react';
import classNames from "classnames";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import './list-item-el.scss'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const styles = {
    selected: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)!important',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
}

class ListItemEl extends Component {
    state = {
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
        this.props.select(item)
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
        const { selectedIndex, item, delQuestion }= this.props
        return (
            <div>
                <ListItem
                    button
                    selected={item.id === selectedIndex}
                    onClick={event => this.handleListItemClick(event, item)}
                    style={{padding: "15px 8px"}}
                >
                    <ListItemText
                        disableTypography
                        primary={<Typography type="body2" className={classNames(item.id === selectedIndex && 'selectedColor')} >{item.val}</Typography>}
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
                            onClick={()=> delQuestion(item)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

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

export default withStyles(styles)(ListItemEl);
