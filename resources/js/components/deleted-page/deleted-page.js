import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from "@material-ui/core/Grid";
import SwipeView from "../swipe-view";
import {bindActionCreators} from "redux"
import {connect} from 'react-redux'
import { fetchDeleted } from "../../actions/trash";
import DeletedList from "../deleted-list";
import ShowDeleted from "../show-deleted";
import './deleted-page.scss'

const Transition = props => <Slide direction="up" {...props} />

class DeletedPage extends Component {
    state = {
        selected: null,
    };

    handleItemSelect = (item) => {
        this.setState({ selected: item });
    };

    onShowNode = (node) => {
        this.setState({node:node})
    }

    componentDidMount() {
        this.props.fetchDeleted(this.props.project)
    }

    render() {
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.isOpen}
                    TransitionComponent={Transition}
                >
                    <AppBar position="static" style={{ background: 'linear-gradient(to right, #7b4397, #dc2430)' }}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" style={{flex: '1'}}>
                                Корзина
                            </Typography>
                            <Button color="inherit" onClick={() => this.props.onAdd(this.state.selected)}>
                                Восстановить
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <Grid container spacing={0} >
                        <Grid item xs={12} sm={6} md={4} >
                            <SwipeView lables={['Вопросы', 'Объекты', 'Авто']} >
                                <DeletedList items={this.props.removed.questions} selected={this.state.selected} onSelect={this.handleItemSelect} type="question"/>
                                <DeletedList items={this.props.removed.objects} selected={this.state.selected}  onSelect={this.handleItemSelect} type="object"/>
                                <DeletedList items={this.props.removed.avto} selected={this.state.selected}  onSelect={this.handleItemSelect} type="avto"/>
                            </SwipeView>

                        </Grid>
                        <Grid item xs={12} sm={6} md={8} style={{zIndex: 1}}>
                            <ShowDeleted item={this.state.selected} />
                        </Grid>
                    </Grid>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = ({ removed }) => {
    return { removed }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchDeleted }, dispatch)

export default  connect(mapStateToProps, mapDispatchToProps)(DeletedPage);
