import React, {Component} from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import classNames from 'classnames'

class DeletedList extends Component {

    handleListItemClick = (event, index, item) => {
        this.props.onSelect({...item, type: this.props.type})
    };

    render() {
        return (
            <div>
                <List component="nav" className="backupList">
                    {this.props.items.map((item, idx) => (
                        <ListItem
                            button
                            key={item._id}
                            onClick={event => this.handleListItemClick(event, idx, item)}
                            className={this.props.selected ? classNames('back_up_item', (item._id === this.props.selected._id) && 'mySelected'): 'back_up_item'}
                        >
                            <ListItemText primary={item.name} secondary={item.created_at}  />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default DeletedList;
