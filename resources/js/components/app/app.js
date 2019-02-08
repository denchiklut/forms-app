import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Main from '../main'
import {emphasize} from "@material-ui/core/styles/colorManipulator";
import Select from 'react-select';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from "classnames";
import Chip from "@material-ui/core/Chip";
import {fetchProjects, selectProject} from '../../actions/projects'
import {bindActionCreators} from "redux";
import {compose} from "recompose";
import {connect} from 'react-redux';

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
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        overflowX: 'hidden',
        height: '100vh',
        overflow: 'auto',
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px`,
        color: 'white',
        // background: 'linear-gradient(to right, #ff512f, #dd2476)',
        background: 'linear-gradient(45deg, #7221f3 30%, #d321f3 90%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 8,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    myInputSelect: {
        position: 'relative',
        boxSizing: 'border-box',
        background: '#ffffff6b',
        marginRight: 0,
        textAlign: 'right',
        marginLeft: 'auto',
        borderRadius: '3px',
        paddingRight: 0,
        minWidth: '250px',
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <div>
            <Chip
                tabIndex={-1}
                label={props.children}
                className={classNames(props.selectProps.classes.chip, {
                    [props.selectProps.classes.chipFocused]: props.isFocused,
                })}
            />
        </div>



    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class App extends React.Component {
    state = {
        single: null,
        multi: null,
    };

    handleChange = name => value => {
        this.setState({
            [name]: value,
        });

        this.props.selectProject(value);
    };

    componentDidMount() {
        this.props.fetchProjects()
    }

    render() {
        const { classes, theme } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: 'white',
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        const suggestions = this.props.projects.map(suggestion => ({
            value: suggestion.label,
            label: suggestion.label,
        }));

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
                            Editor
                        </Typography>

                        <div className={classes.myInputSelect}>
                            <NoSsr >
                                <Select
                                    classes={classes}
                                    styles={selectStyles}
                                    options={suggestions}
                                    components={components}
                                    value={this.state.single}
                                    onChange={this.handleChange('single')}
                                    placeholder="Search project"
                                    // isClearable
                                />
                            </NoSsr>
                        </div>


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
    theme: PropTypes.object.isRequired,
    fetchProjects: PropTypes.func.isRequired,
    selectProject: PropTypes.func.isRequired,


};

function mapStateToProps(state) {
    return {
        projects: state.projects,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchProjects: fetchProjects,
        selectProject: selectProject
    }, dispatch)
}

export default compose(withStyles(styles, { withTheme: true }), connect(mapStateToProps, mapDispatchToProps))(App);
