import React, {Component} from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { fetchDeleteQuestion, fetchUpdateQuestion, selectQuestion } from '../../actions/questions'
import { openAddForm } from '../../actions/dialogs'
import { bindActionCreators } from "redux";
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from "prop-types";
import classNames from 'classnames';
import ListItemEl from '../list-item-el'
import AddForm from '../add-form'
import EmptyList from '../empty-list'
import './list-container.scss'


class ListContainer extends Component {

    //Open Add form
    handleClickOpen = () => {
        this.props.openAddForm(true);
    };

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

    render() {
        if ( this.props.items.length === 0 ) {
            return <EmptyList />
        }
        return (
            <div className="myList">
                <List component="nav" style={{paddingTop: 0}}>
                    {this.props.items.map((item) => (
                        <div
                            key={item.id}
                            className={classNames("myListItem", (item.id === this.props.activeQst.id) && 'selected')}>

                            <ListItemEl
                                item={item}
                                type={this.props.type}
                                select={this.props.select}
                                editQuestion={this.props.editQuestion}
                                delQuestion={this.props.delQuestion}
                                selectedIndex={this.props.activeQst.id}
                            />
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

                {this.props.showAddForm ? <AddForm /> : null}
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
        showAddForm: state.showAddDialog,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            select: selectQuestion,
            delQuestion: fetchDeleteQuestion,
            editQuestion: fetchUpdateQuestion,
            openAddForm: openAddForm,
        }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ListContainer);
