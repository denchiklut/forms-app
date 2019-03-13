import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import SelectProject from '../select-project'
import { Link } from 'react-router-dom'
import GoogleAuth from '../google-auth'
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
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className="menu-title"
                >
                    <Link to="/" style={{textDecoration: "none", color: "white"}}>
                        Editor
                    </Link>
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

export default HeaderBar;
