import React, { Component } from 'react';
import Sortable from './Sortable/index';
import Grid from '@material-ui/core/Grid';
import GrafD3 from './GrafD3';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AddQuestion from './question/AddQuestion'
import {compose} from "recompose";
import {connect} from 'react-redux';
import {fetchQuestions} from '../actions'


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

class Example extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

  componentDidMount() {
      this.props.fetchQuestions()
  }

    render() {
        const { theme } = this.props;
        return (
            <div style={{margin: 'auto'}}>
                <Grid container spacing={24}>
                    <Grid item xs={3} style={{paddingRight: 1}}>
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
                            <TabContainer dir={theme.direction}><Sortable items={this.props.questions} /><AddQuestion /></TabContainer>
                            <TabContainer dir={theme.direction}><Sortable items={this.props.objects}/><AddQuestion /></TabContainer>
                            <TabContainer dir={theme.direction}>Item Three</TabContainer>
                        </SwipeableViews>

                    </Grid>
                    <Grid item xs={9} style={{paddingLeft: 0}}>
                        <GrafD3 />
                    </Grid>
                </Grid>
            </div>
        );
    }
}


Example.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
    objects: PropTypes.array.isRequired,
    fetchQuestions: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        questions: state.questions,
        objects: state.objects,
    }
}

export default compose(withStyles(styles, { withTheme: true }), connect(mapStateToProps, {fetchQuestions}))(Example);

