import React, {Component} from 'react'
import {connect} from 'react-redux'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import DeleteIcon from '@material-ui/icons/Delete'
import ListItem from '@material-ui/core/ListItem'
import EditIcon from '@material-ui/icons/Edit'

import { fetchUpdateQuestion } from "../../actions/questions"
import { fetchUpdateObject } from "../../actions/objects"
import { bindActionCreators } from "redux"

import EditFormDialog from '../edit-form'
import EditObject from "../edit-object"
import EditAvto from "../edit-avto"
import './list-item-el.scss'
import {fetchUpdateAvto} from "../../actions/avto";


class ListItemEl extends Component {
    state = {
        isOpen: false,
        editItem: {},
    }

    //Open Edit form
    handleClickOpenEdit = (item) => {
        this.setState({ editItem: item, isOpen: true })
    };

    //Select Item in list
    handleListItemClick = (event, item) => {
        this.props.select(item)
    }

    closeEditForm = () => {
        this.setState(( { isOpen } ) => {
            return {
                isOpen: !isOpen
            }
        })
    }

    saveEdit = (data) => {
       this.props.fetchUpdateQuestion(data)
       this.closeEditForm()
    }

    saveUpdate = (data) => {
        this.props.fetchUpdateObject(data)
        this.closeEditForm()
    }

    saveUpdateAvto = (data) => {
        this.props.fetchUpdateAvto(data)
        this.closeEditForm()
    }

    handleDel = (item) => {
        switch (this.props.type) {
            case "question":
                let data = this.props.nodes;

                let id = item._id;
                let check = false;

                let findQuestion = (data, id) =>
                {
                    if (data.idd === id)
                    {
                        check = true;
                    }else
                    {
                        for (let i = 0; i < data.children.length; i++)
                        {

                            findQuestion( data.children[i], id);
                        }
                    }
                }

                findQuestion ( data, id );

                if (check)
                {
                    alert('Сначала удалите вопрос из графа');
                }
                else
                {
                    this.props.delQuestion(item)
                }
                break
            case "object":
                const obj = prompt('Введите название обьекта для удаления', 'Обьект');

                if (item.name === obj) {
                    this.props.delObject(item)
                } else {
                    alert('Неправильное имя обьекта! Обьект: ' + obj + ' не найден!')
                }
                break
            case "avto":
                this.props.delAvto(item)
        }

    }

    render() {
        const { selectedIndex, item, type }= this.props
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
                        primary={<Typography type="body2">{item.name.substr(0, 50)}</Typography>}
                    />

                    <ListItemSecondaryAction>
                        <IconButton
                            aria-label="Edit"
                            onClick={() => this.handleClickOpenEdit(item)}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            aria-label="Delete"
                            onClick={()=> this.handleDel(item)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

                { ( Object.keys(this.state.editItem).length !== 0 && this.state.isOpen ) ?
                    this.props.type === 'question' ?
                        <EditFormDialog
                            onEdit   = { this.saveEdit }
                            isOpen   = { this.state.isOpen }
                            onClose  = { this.closeEditForm }
                            editItem = { this.state.editItem }
                        />: this.props.type === 'object' ?
                        <EditObject
                            onEdit   = { this.saveUpdate }
                            isOpen   = { this.state.isOpen }
                            onClose  = { this.closeEditForm }
                            editItem = { this.state.editItem }
                        />:
                        <EditAvto
                            onEdit   = { this.saveUpdateAvto }
                            isOpen   = { this.state.isOpen }
                            onClose  = { this.closeEditForm }
                            editItem = { this.state.editItem }
                        />: null
                }

            </div>

        );
    }
}


const matchDispatchToProps = dispatch => bindActionCreators({ fetchUpdateQuestion, fetchUpdateObject, fetchUpdateAvto }, dispatch)

export default connect(null, matchDispatchToProps)(ListItemEl);
