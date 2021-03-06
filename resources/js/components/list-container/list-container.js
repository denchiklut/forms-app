import React, {Component} from 'react'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import classNames from 'classnames'
import Grow from '@material-ui/core/Grow'

import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'

import {fetchAddAvto, fetchDeleteAvto} from "../../actions/avto"
import {fetchAddObject, fetchDeleteObject} from "../../actions/objects"
import { fetchAddQuestion, fetchDeleteQuestion, selectQuestion } from '../../actions/questions'

import ListItemEl from '../list-item-el'
import AddForm from '../add-form'
import AddAvto  from '../add-avto'
import AddObject  from '../add-object'
import EmptyList from '../empty-list'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import InputBase from "@material-ui/core/InputBase"
import './list-container.scss'

class ListContainer extends Component {
    state = {
        isOpen: false,
        term: '',
        items: [],
    }

    handleClickOpen = () => {
        this.setState({isOpen: true})
    };

    closeAddForm = () => {
        this.setState(( { isOpen } ) => {
          return {isOpen: !isOpen }
        })
    }

    saveAddAvto = data => {
        this.props.fetchAddAvto({name: data.name, value: data})
        this.closeAddForm()
    }

    saveAddObject = (data) => {
        this.props.fetchAddObject({name: data.name, value: data})
        this.closeAddForm()
    }

    saveAddQuestion = (data) => {
        this.props.fetchAddQuestion(data)
        this.closeAddForm()
    }

    renderAddForm = () => {

        switch (this.props.type) {
            case 'question':
                return <AddForm
                        isOpen  = { this.state.isOpen }
                        onAdd   = { this.saveAddQuestion }
                        onClose = { this.closeAddForm }
                        project = { this.props.activeProject.value }
                    />
            case 'object':
                return <AddObject
                           isOpen  = { this.state.isOpen }
                           onAdd   = { this.saveAddObject }
                           onClose = { this.closeAddForm }
                           project = { this.props.activeProject.value }
                       />
            case 'avto':
                return <AddAvto
                            isOpen  = { this.state.isOpen }
                            onAdd   = { this.saveAddAvto }
                            onClose = { this.closeAddForm }
                            project = { this.props.activeProject.value }
                        />
            default: return null
        }
    }

    renderEmtyList = () => {
        return (
            <div style={{position: "relative"}}>
                <EmptyList />
                {Object.keys(this.props.activeProject).length !== 0 ?
                    <Fab
                        style={{position: 'absolute', bottom: '15px', right: '15px'}}
                        aria-label = "Add"
                        className  = "myAdd"
                        size       = "medium"
                        onClick    = { this.handleClickOpen }
                        color      = { this.props.type === 'question' ? "secondary" : "primary"}
                    >
                        <AddIcon />
                    </Fab>: null
                }

                { this.state.isOpen ? this.renderAddForm() : null}

            </div>
        )
    }

    render() {
        if ( this.props.items.length === 0 ) return this.renderEmtyList()

        const filtered = this.props.items.filter((item) => item.name.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1)
        const {type, nodes, selectQuestion, fetchDeleteObject, fetchDeleteQuestion, editQuestion, activeQuestion, fetchDeleteAvto} = this.props

        return (
            <div className="myList">
                <List component="nav" style={{paddingTop: 0}}>
                    <AppBar position="static">
                        <Toolbar className="searchWrp">
                            <div className="searchCnt">
                                <div className="searchIcn">
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    className="searchInp"
                                    placeholder="Search…"
                                    value={this.state.term}
                                    onChange={(e) => this.setState({term: e.target.value})}
                                />
                            </div>
                        </Toolbar>
                    </AppBar>
                    {filtered.map((item) => (
                        <Grow
                            in={true}
                            style={{ transformOrigin: '0 0 0' }}
                            {...{ timeout: 1000 }}
                            key={item._id}
                        >
                        <div
                            className={classNames(this.props.type === 'question' ? 'questionItem': 'objectItem', (item._id === this.props.activeQuestion._id) && 'selected')}
                        >
                            <ListItemEl
                                item          = { item }
                                type          = { type }
                                nodes         = { nodes }
                                editQuestion  = { editQuestion }
                                select        = { selectQuestion }
                                delAvto       = { fetchDeleteAvto }
                                delObject     = { fetchDeleteObject }
                                delQuestion   = { fetchDeleteQuestion }
                                selectedIndex = { activeQuestion._id }
                            />
                            <Divider />
                        </div>
                        </Grow>
                    ))}
                </List>

                <div className  = "myAdd">
                    <Fab
                        aria-label = "Add"
                        size       = "medium"
                        onClick    = { this.handleClickOpen }
                        color      = {this.props.type === 'question' ? "secondary" : "primary"}
                    >
                        <AddIcon />
                    </Fab>
                </div>

                { this.state.isOpen ? this.renderAddForm() : null}
            </div>
        );
    }

}
ListContainer.propTypes = {
    items: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
}

const mapStateToProps = ({activeQuestion, activeProject, nodes}) => {
    return { activeQuestion, activeProject, nodes }
}

const matchDispatchToProps = dispatch => bindActionCreators({selectQuestion, fetchAddQuestion, fetchAddObject, fetchDeleteQuestion, fetchDeleteObject, fetchAddAvto, fetchDeleteAvto}, dispatch)

export default connect(mapStateToProps, matchDispatchToProps)(ListContainer);
