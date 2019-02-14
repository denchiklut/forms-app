import React, {Component} from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {fetchUpdateQuestion} from "../../actions/questions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import EditFormDialog from '../edit-form'
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import classNames from "classnames";
import {compose} from "recompose";
import './list-item-el.scss'

const styles = {
    selected: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)!important',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
}

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
                    selected={item.id === selectedIndex}
                    onClick={event => this.handleListItemClick(event, item)}
                    style={{padding: "15px 8px"}}
                >
                    <ListItemText
                        disableTypography
                        primary={<Typography type="body2" className={classNames(item.id === selectedIndex && 'selectedColor')} >{item.value}</Typography>}
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
                        isOpen   = { this.state.isOpen }
                        onEdit   = { this.saveEdit }
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

export default compose( withStyles(styles), connect(null, matchDispatchToProps))(ListItemEl);
