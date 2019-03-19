import React, {Component} from 'react'
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import SwipeableViews from 'react-swipeable-views'


class SwipeView extends Component {
    state = {
        value: 0,
    }

    render() {
        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        indicatorColor = "primary"
                        textColor      = "primary"
                        variant        = "fullWidth"
                        value          = { this.state.value }
                        onChange       = { (e, value) => this.setState({value}) }
                    >
                        {this.props.lables.map(item => (
                            <Tab key={item} label={item} />
                        ))}
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis          = "x"
                    index         = { this.state.value }
                    onChangeIndex = { (e, index) => this.setState({ value: index }) }
                >
                    {this.props.children}
                </SwipeableViews>
            </div>
        );
    }
}

export default SwipeView;
