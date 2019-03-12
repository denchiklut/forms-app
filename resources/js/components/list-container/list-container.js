import React, {Component} from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from "prop-types";
import classNames from 'classnames';

import {fetchAddObject, fetchDeleteObject} from "../../actions/objects";
import { fetchAddQuestion, fetchDeleteQuestion, selectQuestion } from '../../actions/questions'

import ListItemEl from '../list-item-el'
import AddForm from '../add-form'
import AddObject  from '../add-object'
import EmptyList from '../empty-list'
import './list-container.scss'

class ListContainer extends Component {
    state = {
        isOpen: false
    }

    //Open Add form
    handleClickOpen = () => {
        this.setState({isOpen: true})
    };

    closeAddForm = () => {
        this.setState(( { isOpen } ) => {
          return {isOpen: !isOpen }
        })
    }

    saveAddObject = (data) => {
        this.props.fetchAddObject({name: data.name, value: data})
        this.closeAddForm()
    }

    saveAddQuestion = (data) => {
        this.props.addQuestion(data)
        this.closeAddForm()
    }

    render() {
        if ( this.props.items.length === 0 ) {
            return (
            <div style={{position: "relative"}}>
                <EmptyList />
                {Object.keys(this.props.activeProject).length !== 0 ?
                    <Fab
                        style={{position: 'absolute', bottom: '15px', right: '15px'}}
                        aria-label = "Add"
                        className  = "myAdd"
                        size       = "medium"
                        color      = "secondary"
                        onClick    = { this.handleClickOpen }
                    >
                        <AddIcon />
                    </Fab>: null
                }

                { this.state.isOpen ?
                    this.props.type === 'question' ?
                        <AddForm
                            isOpen  = { this.state.isOpen }
                            onAdd   = { this.saveAddQuestion }
                            onClose = { this.closeAddForm }
                            project = { this.props.activeProject.value }
                        /> :
                        <AddObject
                            isOpen  = { this.state.isOpen }
                            onAdd   = { this.saveAddObject }
                            onClose = { this.closeAddForm }
                            project = { this.props.activeProject.value }
                        /> :
                    null}

            </div>)
        }
        return (
            <div className="myList">
                <List component="nav" style={{paddingTop: 0}}>
                    {this.props.items.map((item) => (
                        <div
                            key={item._id}
                            className={classNames("myListItem", (item._id === this.props.activeQst._id) && 'selected')}
                        >
                            <ListItemEl
                                item          = { item }
                                type          = { this.props.type }
                                nodes         = { this.props.nodes }
                                select        = { this.props.select }
                                delObject     = { this.props.delObject }
                                delQuestion   = { this.props.delQuestion }
                                editQuestion  = { this.props.editQuestion }
                                selectedIndex = { this.props.activeQst._id }
                            />
                            <Divider />
                        </div>
                    ))}
                </List>
                <Fab
                    aria-label = "Add"
                    className  = "myAdd"
                    size       = "medium"
                    color      = "secondary"
                    onClick    = { this.handleClickOpen }
                >
                    <AddIcon />
                </Fab>
                { this.state.isOpen ?
                    this.props.type === 'question' ?
                    <AddForm
                        isOpen  = { this.state.isOpen }
                        onAdd   = { this.saveAddQuestion }
                        onClose = { this.closeAddForm }
                        project = { this.props.activeProject.value }
                    /> :
                    <AddObject
                        isOpen  = { this.state.isOpen }
                        onAdd   = { this.saveAddObject }
                        onClose = { this.closeAddForm }
                        project = { this.props.activeProject.value }
                    /> :
                    null}
            </div>
        );
    }

}
ListContainer.propTypes = {
    items: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        activeQst: state.activeQuestion,
        activeProject: state.activeProject,
        nodes: state.nodes,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            select:      selectQuestion,
            addQuestion: fetchAddQuestion,
            fetchAddObject: fetchAddObject,
            delQuestion: fetchDeleteQuestion,
            delObject: fetchDeleteObject,
        }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ListContainer);
