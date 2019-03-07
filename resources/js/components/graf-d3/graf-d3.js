import React, { Component } from 'react'
import Tree from 'react-d3-tree'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Chip from "@material-ui/core/Chip"
import GrafAddForm from "../garf-add-form"
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';
import uuid from "uuid"
import AppBar from '@material-ui/core/AppBar'
import GrafSelectedPanel from '../graf-selected-panel'
import './graf-3d.scss'

const svgStyle = {
    nodes: {
        node: {
            circle: {
                fill: "#a94690",
                stroke: '#837086',
                strokeWidth: 1,
                transform: 'scale(2,2)'

            }
        },
        leafNode: {
            circle: {
                fill: "#a94690",
                stroke: '#837086',
                strokeWidth: 1,
                transform: 'scale(2,2)'
            }
        }
    }
}


class GrafD3 extends Component {

    state = {
        selected: null,
        isOpen: false,
        insert: false,
        data: {
            idd:  0,
            name: '',
            answer: '',
            children: [],
        },
        direction: 'left',
        open: false,
        hidden: false,
    }

    handleClick = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    initGraf() {
        this.setState({data: {
                idd:  0,
                unique: uuid.v4(),
                project: { _id: this.props.project._id, name: this.props.project.value },
                name: 'Start',
                answer: 'Start',
                children: [],
            }})
    }

    addNode = data => {
        let newData = {...this.state.data}

        //id of question that we trying to add to graf
        let searched = this.state.selected

        const findNodebyId = function(searched, newData) {
            let j,
                currentChild,
                result;


            if (searched.unique === newData.unique) {

                if (data.addQst.type === "objects") {
                    newData.children.push(
                        {
                            name:     data.addQst.value,
                            value:    data.addQst.value,
                            idd:      data.addQst._id,
                            type:     data.addQst.type,
                            objData:  data.addQst.data,
                            answer:   searched.idd === 0 ? 'start' : data.answer,
                            unique:   uuid.v4(),
                            children: []
                        })
                } else {
                    newData.children.push(
                        {
                            name:     data.addQst.value.substr(0, 11),
                            value:    data.addQst.value,
                            idd:      data.addQst._id,
                            type:     data.addQst.type,
                            answer:   searched.idd === 0 ? 'start' : data.answer,
                            unique:   uuid.v4(),
                            children: []
                        })
                }

            } else {

                for (j = 0; j < newData.children.length; j += 1) {
                    currentChild = newData.children[j];

                    // Search in the current child
                    result = findNodebyId(searched, currentChild);
                }

                // The node has not been found and we have no more options
                return false;
            }
        }

        findNodebyId(searched, newData)

        this.props.onAddNode(data, newData)
    }

    insertNode = data => {
        let newData = {...this.state.data}

        //id of question that we trying to add to graf
        let searched = this.state.selected

        const findNodebyId = function(searched, newData) {
            let j,
                currentChild,
                result;


            if (searched.unique === newData.unique) {
                let oldChildren = newData.children.slice();
                newData.children = []

                if (data.addQst.type === "objects") {
                    newData.children.push(
                        {
                            name:     data.addQst.value.substr(0, 11),
                            value:    data.addQst.value,
                            idd:      data.addQst._id,
                            type:     data.addQst.type,
                            objData:  data.addQst.data,
                            answer:   searched.idd === 0 ? 'start' : data.answer,
                            children: [...oldChildren]})
                } else {
                    newData.children.push(
                        {
                            name:     data.addQst.value.substr(0, 11),
                            value:    data.addQst.value,
                            idd:      data.addQst._id,
                            type:     data.addQst.type,
                            answer:   searched.idd === 0 ? 'start' : data.answer,
                            children: [...oldChildren]})
                }

            } else {

                for (j = 0; j < newData.children.length; j += 1) {
                    currentChild = newData.children[j];

                    // Search in the current child
                    result = findNodebyId(searched, currentChild);
                }

                // The node has not been found and we have no more options
                return false;
            }
        }

        findNodebyId(searched, newData)

        this.props.onAddNode(data, newData)
    }

    removeNode = () => {
        let newData = {...this.state.data}
        let searchId = this.state.selected.unique

        const findNodeById = function(searchId, newData) {
            let j,
                currentChild,
                result

            if (searchId === newData.unique) {
                return true
            }

            else {

                for (j = 0; j < newData.children.length; j += 1) {
                    currentChild = newData.children[j];
                    result = findNodeById(searchId, currentChild);

                    if (result) {
                        currentChild = null
                        newData.children.splice(j, 1)
                        return false
                    }
                }
                return false;
            }
        }

        findNodeById(searchId, newData)

        this.props.removeNode(this.state.selected, newData)
    }

    cutNode = () => {
        let newData = {...this.state.data}
        let searched = this.state.selected

        const findNodeById = function(searched, newData) {
            let j,
                currentChild,
                currentParent,
                result

            if (searched.unique === newData.unique) {
                return true
            }

            else {

                for (j = 0; j < newData.children.length; j ++) {
                    currentChild = newData.children[j];

                    if (currentChild.unique === searched.unique) {
                        currentParent = newData
                    }
                    result = findNodeById(searched, currentChild);

                    if (result) {

                        currentParent.children.map((item, i) => item.unique === searched.unique ? currentParent.children.splice(i, 1) : item)
                        currentParent.children.push(...searched.children)

                        const clrArr =  function (arr) {
                            arr.map(item => {
                                item.children ? clrArr(item.children) : item.children = []
                                delete(item.id)
                                delete(item.parent)
                                delete(item.depth)
                                delete(item._collapsed)
                                delete(item.x)
                                delete(item.y)
                            })
                        }

                        clrArr(newData.children)

                        return false
                    }
                }
                return false;
            }
        }

        findNodeById(searched, newData)

        this.props.removeNode(this.state.selected, newData)
    }

    coloriseNode = (nodeKey) => {
        let newData = {...this.state.data}
        let searchId = nodeKey.unique

        const findNodeById = function(searchId, newData) {
            let j, currentChild

            if (searchId === newData.unique) {
                newData.nodeSvgShape = {
                    shape: 'circle',
                    shapeProps: {
                        r: 10,
                        fill:"#ca2750",
                        stroke: '#f50057'
                    },
                }
            }

            else {
                newData.nodeSvgShape = {}
            }
            for (j = 0; j < newData.children.length; j += 1) {
                currentChild = newData.children[j];
                findNodeById(searchId, currentChild);
            }
        }

        findNodeById(searchId, newData)

        this.setState({
            data: newData
        });

    }

    click = (nodeKey) => {
        this.setState({selected: nodeKey})
        this.coloriseNode(nodeKey)
    }

    openAddNodeForm = () => {
        if (this.state.selected) {
            this.setState({isOpen: true})
        } else {
            alert("Select node!")
        }

    }

    insertAddNodeForm = () => {
        if (this.state.selected) {
            this.setState({isOpen: true, insert: true})
        } else {
            alert("Select node!")
        }

    }

    closeAddNodeForm = () => {
        this.setState(( { isOpen } ) => {
            return {isOpen: !isOpen }
        })
    }

    saveAddNode = data => {

        if (this.state.insert)  {
            this.insertNode(data)
            this.setState({insert: false})
        } else {
            this.addNode(data)
        }

        this.closeAddNodeForm()
    }

    componentDidMount() {
        this.initGraf()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.project !== prevProps.project) {
            this.initGraf()
            this.setState({selected: null})
        }

        if (this.props.grafNodes !== prevProps.grafNodes) {
            Object.keys(this.props.grafNodes ).length === 0 ? this.initGraf() : this.setState({data: this.props.grafNodes})
        }

    }

    render() {

        const actions = [
            { icon: <AddIcon      onClick = { this.openAddNodeForm }  />,  name: 'Add' },
            { icon: <DeleteIcon   onClick = { this.removeNode } />,        name: 'Delete' },
            { icon: <FileCopyIcon onClick = { this.insertAddNodeForm }/>,  name: 'Insert' },
            { icon: <DeleteForeverOutlinedIcon onClick={this.cutNode} />,  name: ' Cut' },
        ]

        const { direction, hidden, open } = this.state

        if (Object.keys(this.props.activeProject).length === 0 )  {
            return (
                <div><h1>Select Project</h1></div>
            )
        }

        return (
            <div id="treeWrapper">
                <AppBar position="static" className="grafAppBar">
                    <Toolbar className='grafToolBar'>
                        <Typography variant="h6" className="grafToolBarChip">
                            <Hidden smDown>
                            <Chip
                                className="grafChip"
                                color="secondary"
                                label={ this.props.activeProject.value  }
                            />
                            </Hidden>
                        </Typography>
                        <div style={{display: 'flex'}}>
                            <SpeedDial
                                style={{transform: 'scale(0.73)', marginRight: '-36px'}}
                                ariaLabel="SpeedDial example"
                                hidden={hidden}
                                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                                onClick={this.handleClick}
                                onBlur={this.handleClose}
                                onClose={this.handleClose}
                                onFocus={this.handleOpen}
                                onMouseEnter={this.handleOpen}
                                onMouseLeave={this.handleClose}
                                open={open}
                                direction={direction}
                            >
                                {actions.map(action => (
                                    <SpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        onClick={this.handleClick}
                                    />
                                ))}
                            </SpeedDial>

                            <Fab
                                color="secondary"
                                size="small"
                                aria-label="Play"
                                className="grafToolBarBtm"
                            >
                                <Link to={`/play/${this.props.activeProject.value}`} style={{textDecoration: "none", color: "white"}}>
                                    <PlayArrow fontSize="small" />
                                </Link>
                            </Fab>
                        </div>
                    </Toolbar>
                </AppBar>

                <Tree
                    transitionDuration = { 0 }
                    collapsible        = { false }
                    orientation        = "vertical"
                    styles             = { svgStyle }
                    onClick            = { this.click }
                    textLayout         = {{ x: 28, y: 0, }}
                    data               = { this.state.data }
                    scaleExtent        = {{ min: 0.1, max: 8 }}
                />

                <GrafSelectedPanel selected={this.state.selected}/>


                {this.state.isOpen ?
                    <GrafAddForm
                        onAdd      = { this.saveAddNode }
                        answers    = { this.props.nodes }
                        isOpen     = { this.state.isOpen }
                        objects    = { this.props.objects }
                        questions  = { this.props.questions }
                        onClose    = { this.closeAddNodeForm }
                        currentQst = { this.state.selected.idd }
                    />
                    : null
                }
            </div>
        )
    }
}

export default GrafD3
