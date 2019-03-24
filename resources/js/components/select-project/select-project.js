import React, {Component} from 'react';
import './select-project.scss'
import NoSsr from "@material-ui/core/NoSsr";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import {emphasize} from "@material-ui/core/styles/colorManipulator";
import {withStyles} from "@material-ui/core";


const styles = theme => ({
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
        minWidth: '243px',
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

class SelectProject extends Component {
    state = {
        single: null,
        multi: null,
    };

    handleChange = name => value => {
        this.setState({
            [name]: value,
        });
        this.props.selectItem(value);
    };

    render() {
        const { classes } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: 'white',
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        let suggestions;

        if (this.props.type === "objects") {
            suggestions = this.props.items.map(suggestion => ({
                _id: suggestion._id,
                value: suggestion.name,
                label: suggestion.name,
                data: suggestion.value,
                type: "objects"
            }))
        } else if (this.props.type === "avto") {
            suggestions = this.props.items.map(suggestion => ({
                _id: suggestion._id,
                value: suggestion.name,
                label: suggestion.name,
                data: suggestion.value,
                type: "avto"
            }))
        } else if (this.props.type === "questions") {
            suggestions = this.props.items.map(suggestion => ({
                _id: suggestion._id,
                type: "questions",
                value: suggestion.name,
                webValue:  suggestion.webName,
                label: suggestion.name,
            }))
        } else {
            suggestions = this.props.items.map(suggestion => ({
                _id: suggestion._id,
                type: "projects",
                value: suggestion.name,
                label: suggestion.name,
            }))
        }



        return (
            <div>
                <div className = { classes.myInputSelect }>
                    <NoSsr >
                        <Select
                            // isClearable
                            placeholder = "Search.."
                            classes     = { classes }
                            components  = { components }
                            options     = { suggestions }
                            styles      = { selectStyles }
                            value       = { this.state.single }
                            onChange    = { this.handleChange('single') }
                        />
                    </NoSsr>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(SelectProject);
