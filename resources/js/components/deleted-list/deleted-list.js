import React, {Component} from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import classNames from 'classnames'
import Toolbar from "@material-ui/core/Toolbar"
import SearchIcon from '@material-ui/icons/Search'
import InputBase from "@material-ui/core/InputBase"
import AppBar from "@material-ui/core/AppBar"
import './deleted-list.scss'


class DeletedList extends Component {

    state = {
        term: ''
    }

    handleListItemClick = (event, index, item) => {
        this.props.onSelect({...item, type: this.props.type})
    };

    filterFun = (item) => {
        let result =  item.name.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1

        if (!result) {
            result =  item._id.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1
        }

        return result
    }

    render() {
        const filtered = this.props.items.filter((item) => this.filterFun(item))
        return (
            <div className="deletedList">
                <List component="nav" className="backupList">
                    <AppBar position="static">
                        <Toolbar className="searchWrp">
                            <div className="searchCnt">
                                <div className="searchIcn">
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    className="searchInp"
                                    placeholder="Search…"
                                    value={this.state.term}
                                    onChange={(e) => this.setState({term: e.target.value})}
                                />
                            </div>
                        </Toolbar>
                    </AppBar>

                    {filtered.map((item, idx) => (
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
