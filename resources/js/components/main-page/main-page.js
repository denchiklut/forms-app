import React, { Component } from 'react';
import ListContainer from '../list-container';
import Grid from '@material-ui/core/Grid';
import GrafD3 from '../graf-d3';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {compose} from "recompose";
import {connect} from 'react-redux';
import {fetchQuestions} from '../../actions/questions'

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 0 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
});

class MainPage extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    componentWillReceiveProps(nextProps){
        if ( nextProps.activeProject !== this.props.activeProject && ( Object.keys(nextProps.activeProject).length !== 0) ) {
            this.props.fetchQuestions(nextProps.activeProject.value)
        }
    }

    render() {
        const { theme } = this.props;
        return (
            <div style={{margin: 'auto'}}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6} md={3} style={{paddingBottom: 0}}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                            >
                                <Tab label="Вопросы" />
                                <Tab label="Обьекты" />
                                <Tab label="Категории" />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <TabContainer dir={theme.direction}>
                                <ListContainer items={this.props.questions} type="question" />
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                Item Two
                                {/*<ListContainer items={this.props.objects} type="object" />*/}
                            </TabContainer>
                            <TabContainer dir={theme.direction}>Item Three</TabContainer>
                        </SwipeableViews>

                    </Grid>
                    <Grid item xs={12} sm={6} md={9} style={{paddingLeft: 0}}>
                        <GrafD3 />
                    </Grid>
                </Grid>
            </div>
        );
    }
}


MainPage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    activeProject: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        questions: state.questions,
        activeProject: state.activeProject
    }
}

export default compose(withStyles(styles, { withTheme: true }), connect(mapStateToProps, {fetchQuestions}))(MainPage);

