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

const Transition = props => <Slide direction="up" {...props} />

class GetBackup extends Component {
    state = {
        selected: null,
        backups: ["1 item", "2 item", "3 item", ],
        selectedIndex: 0,

    };

    handleListItemClick = (event, index, backup) => {
        this.setState({ selectedIndex: index, selected: backup });
    };

    componentDidMount() {
        this.props.getBackups(this.props.project)
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
                    <List component="nav">

                        {this.props.backups.map((backup, idx) => (
                            <ListItem
                                key={backup._id}
                                button
                                selected={this.state.selectedIndex === idx}
                                onClick={event => this.handleListItemClick(event, idx, backup)}
                            >
                                <ListItemText primary={backup.description} secondary={backup.created_at}  />
                            </ListItem>
                        ))}
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default GetBackup;
