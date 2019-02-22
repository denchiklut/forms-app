import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import {withStyles} from "@material-ui/core";
import SelectProject from '../select-project'
import './header-bar.scss'


const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: 'linear-gradient(to right, #dc2430, #7b4397)',
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginLeft: -12,
    },
    title: {
        flexGrow: 1,
    },
});


class HeaderBar extends Component {

    render() {
        const { classes, theme } = this.props;

        return (
            <div>
                <CssBaseline />

                <AppBar
                    position="absolute"
                    className={classes.appBar}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Editor
                        </Typography>

                        <SelectProject
                            type       = "projects"
                            items      = { this.props.projects }
                            selectItem = { this.props.selectProject }
                        />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(HeaderBar);
