import React, {Component} from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { fetchUpdateQuestion } from "../../actions/questions";
import { fetchUpdateObject } from "../../actions/objects";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditObject from "../edit-object/edit-object";
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
        editItem: {},
    }

    qstRef = React.createRef()

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
       this.props.editQuestion(data)
       this.closeEditForm()
    }

    saveUpdate = (data) => {
        this.props.editObject(data)
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
                this.props.delObject(item)
                break
        }

    }

    renderQst = (item) => {

        function extractContent(s, space) {
            let span = document.createElement('span');
            span.innerHTML= s;
            if(space) {
                let children= span.querySelectorAll('*');
                for(let i = 0 ; i < children.length ; i++) {
                    if(children[i].textContent)
                        children[i].textContent+= ' ';
                    else
                        children[i].innerText+= ' ';
                }
            }
            return [span.textContent || span.innerText].toString().replace(/ +/g,' ');
        }

        return extractContent(item.name)
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
                        primary={<div ref={this.qstRef}>{type === 'question' ? this.renderQst(item) : item.name}</div>}
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
                        />:
                        <EditObject
                            onEdit   = { this.saveUpdate }
                            isOpen   = { this.state.isOpen }
                            onClose  = { this.closeEditForm }
                            editItem = { this.state.editItem }
                        />:
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
            editObject: fetchUpdateObject,
        }, dispatch)
}

export default connect(null, matchDispatchToProps)(ListItemEl);
