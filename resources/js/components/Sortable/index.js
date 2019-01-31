import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import Divider from '@material-ui/core/Divider';
import {selectQuestion} from '../../actions'
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from "prop-types";

class Sortable extends Component {
    state = {
        selectedIndex: 1,
    }

    handleListItemClick = (event, item) => {
        this.setState({selectedIndex: item.id})
        this.props.select(item)
    }

    componentWillMount() {}

    render() {
        return (
            <div style={{position: 'relative'}}>
                <List component="nav" style={{maxHeight: "50vh", overflow: "scroll", paddingBottom: 0, paddingTop: 0}}>
                {this.props.items.map((item) => (
                  <div  key={item.id}>
                      <ListItem
                          button
                          selected={item.id === this.state.selectedIndex}
                          onClick={event => this.handleListItemClick(event, item)}
                          style={{padding: "15px 8px"}}
                      >
                          <ListItemText primary={item.val}/>
                          <ListItemSecondaryAction>
                              <IconButton aria-label="Delete">
                                  <DeleteIcon />
                              </IconButton>
                          </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                  </div>
                ))}
                </List>
                <Fab size="medium" color="secondary" aria-label="Add" className="myAdd" style={{position: "absolute", bottom: "24px", right: "22px"}}>
                    <AddIcon />
                </Fab>
            </div>
        );
    }

}
Sortable.propTypes = {
    items: PropTypes.array.isRequired,
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({select: selectQuestion}, dispatch)
}

export default connect(null, matchDispatchToProps)(Sortable);
