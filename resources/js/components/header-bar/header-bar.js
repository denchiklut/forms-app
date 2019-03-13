import React from 'react'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from '@material-ui/icons/Menu'
import Typography from "@material-ui/core/Typography"
import CssBaseline from "@material-ui/core/CssBaseline"
import SelectProject from '../select-project'
import { Link } from 'react-router-dom'
import GoogleAuth from '../google-auth'
import Avatar from '@material-ui/core/Avatar'
import Hidden from '@material-ui/core/Hidden'
import {connect} from 'react-redux';
import './header-bar.scss'



const HeaderBar = props => (
    <div className="header-bar">
        <CssBaseline />
        <AppBar
            position="absolute"
            className="app-header"
        >
            <Toolbar className="app-toolbar">
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    className="menu-btn"
                >
                    <Link to="/" style={{textDecoration: "none", color: "white", fontSize: 0}}>
                        {props.profile.avatar ?
                            <Avatar
                                alt={props.profile.name}
                                src={props.profile.avatar}
                            /> :
                            <MenuIcon />}
                    </Link>
                </IconButton>

                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className="menu-title"
                    >
                        <Hidden xsDown>
                            <Link to="/" style={{textDecoration: "none", color: "white"}}>
                                {props.profile.name ? props.profile.name : 'Editor' }
                            </Link>
                        </Hidden>
                    </Typography>

                <SelectProject
                    type       = "projects"
                    items      = { props.projects }
                    selectItem = { props.selectProject }
                />
                <GoogleAuth />
            </Toolbar>
        </AppBar>
        <div className='appBarSpacer' />
    </div>
);

const mapStateToProps = (state) => {
    return {
        profile: state.auth
    }
}

export default connect(mapStateToProps)(HeaderBar);
