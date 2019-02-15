import React, {Component} from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {fetchUpdateQuestion} from "../../actions/questions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import EditFormDialog from '../edit-form'
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import './list-item-el.scss'


class ListItemEl extends Component {
    state = {
        isOpen: false,
        editItem: null,
    }

    //Open Edit form
    handleClickOpenEdit = (item) => {
        this.setState({ editItem: item })
        this.setState({ isOpen: true })
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

    closeEditForm = () => {
        this.setState(( { isOpen } ) => {
            return {
                isOpen: !isOpen
            }
        })
    }

    saveEdit = (data) => {
        this.props.editQuestion(data)
       this.closeEditForm()
    }

    render() {
        const { selectedIndex, item, delQuestion, type }= this.props
        return (
            <div>
                <ListItem
                    button
                    selected={item._id === selectedIndex}
                    onClick={event => this.handleListItemClick(event, item)}
                    style={{padding: "15px 8px"}}
                >
                    <ListItemText
                        disableTypography
                        primary={<Typography type="body2">{item.value}</Typography>}
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

                { ( this.state.editItem && this.state.isOpen )?
                    <EditFormDialog
                        type={type}
                        onEdit   = { this.saveEdit }
                        isOpen   = { this.state.isOpen }
                        onClose  = { this.closeEditForm }
                        editItem = { this.state.editItem }
                    /> :
                    null
                }

            </div>
        );
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            editQuestion: fetchUpdateQuestion,
        }, dispatch)
}

export default connect(null, matchDispatchToProps)(ListItemEl);
