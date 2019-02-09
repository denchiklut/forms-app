import React, {Component} from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {fetchAddQuestion, fetchDeleteQuestion, fetchUpdateQuestion, selectQuestion} from '../../actions/questions'
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
import classNames from 'classnames';
import Grid from "@material-ui/core/Grid";
import ListItemEl from '../list-item-el'
import './list-container.scss'


class ListContainer extends Component {
    state = {
        open: false,
    }

    //Open Add form
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    //Close Add form
    handleClose = () => {
        this.setState({ open: false });
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

    render() {
        if ( this.props.items.length === 0 ) {
            return(
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{height: 'calc(100vh - 64px - 48px)', borderRight: '1px solid #0e0e0e24', background: '#e0e0e091'}}
                >
                    <Grid item xs={12}>
                        <div style={{width: '70%', margin: 'auto'}}>
                            <div className="noList" >
                                <h1 className="noMsg">There is nothing yet </h1>
                            </div>
                        </div>

                    </Grid>

                </Grid>

            )
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

                {/*//Add dialog form*/}
                <Dialog
                    fullWidth={true}
                    maxWidth="lg"
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="draggable-dialog-title"
                    className="form-container"

                >
                    <form className="form">
                        <DialogTitle className="form_heading">Добавление {this.props.type}</DialogTitle>
                        <DialogContent className="form-container">
                            <textarea
                                autoFocus
                                required
                                rows="12"
                                cols="28"
                                ref={(input) => this.getMessage = input}
                                placeholder="Enter Post"
                            />
                            <br /><br />
                        </DialogContent>
                        <DialogActions className="control-buttons">
                            <Button onClick={this.handleClose}  className="delete">
                                Отмена
                            </Button>
                            <Button onClick={this.handleSubmit} className="edit">
                                Добавить
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
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
        activeQst: state.activeQuestion
    }
}

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

export default connect(mapStateToProps, matchDispatchToProps)(ListContainer);
