import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Main from './Main'


const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 0,
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
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
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        // paddingLeft: theme.spacing.unit,
        // paddingRight: theme.spacing.unit,
        overflowX: 'hidden',
        height: '100vh',
        overflow: 'auto',
    },

});
class App extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
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
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Main />
                </main>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
