import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import classNames from 'classnames'
import './get-backup.scss'
import ResetedGraf from "../reseted-graf";
import SwipeView from "../swipe-view";
import ShowNode from "../show-node";

const Transition = props => <Slide direction="up" {...props} />

class GetBackup extends Component {
    state = {
        selected: null,
        selectedIndex: 0,
        node: {},

    };

    handleListItemClick = (event, index, backup) => {
        console.log('%c selected ',
            'color: white; background-color: #95B46A',
            backup);
        this.setState({ selectedIndex: index, selected: backup });
    };

    componentDidMount() {
        this.props.getBackups(this.props.project)
    }

    onShowNode = (node) => {
        this.setState({node:node})
    }

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Open full-screen dialog
                </Button>
                <Dialog
                    fullScreen
                    open={this.props.isOpen}
                    TransitionComponent={Transition}
                >
                    <AppBar position="static" >
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" style={{flex: '1'}}>
                                Бэкапы проекта {this.props.project}
                            </Typography>
                            <Button color="inherit" onClick={() => this.props.onAdd(this.state.selected)}>
                                Откатить
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6} md={3} >
                            <SwipeView lables={['История', 'Просмотр']} >
                                <List component="nav" className="backupList">
                                    {this.props.backups.map((backup, idx) => (
                                        <ListItem
                                            button
                                            key={backup._id}
                                            onClick={event => this.handleListItemClick(event, idx, backup)}
                                            className={this.state.selected ? classNames('back_up_item', (backup._id === this.state.selected._id) && 'mySelected'): 'back_up_item'}
                                        >
                                            <Avatar alt={backup.user.name} src= {backup.user.avatar} className="myAvtar" />
                                            <ListItemText primary={backup.description} secondary={backup.created_at}  />
                                        </ListItem>
                                    ))}
                                </List>
                                <ShowNode node={this.state.node} />
                            </SwipeView>

                        </Grid>
                        <Grid item xs={12} sm={6} md={9} >
                            <ResetedGraf backup={this.state.selected} showNode={this.onShowNode} />
                        </Grid>
                    </Grid>
                </Dialog>
            </div>
        );
    }
}

export default GetBackup;
