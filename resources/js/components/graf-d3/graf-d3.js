import React, { Component } from 'react'
import Tree from 'react-d3-tree'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import Chip from "@material-ui/core/Chip"
import GrafSelectedPanel from '../graf-selected-panel'
import GrafAddForm from "../garf-add-form"
import './graf-3d.scss'

const svgStyle = {
    nodes: {
        node: {
            circle: {
                fill: "#96ffbf",
                stroke: '#7872d4c2',
                strokeWidth: 2
            }
        },
        leafNode: {
            circle: {
                fill: "#efefef",
                stroke: '#7872d4c2',
                strokeWidth: 2
            }
        }
    }
}

class GrafD3 extends Component {

    state = {
        transitionDuration: 300,
        selected: null,
        isOpen: false,
        data: {},
    }

    initGraf() {
        this.setState({data: {
                idd:  0,
                project: {_id: this.props.project._id, value: this.props.project.value},
                name: 'Start',
                answer: 'Start',
                children: [],
            }})
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



    addNode = data => {
        if (this.state.selected) {
            this.setState({transitionDuration: 300})
            let newData = {...this.state.data}
            // let searchVal = this.state.selected.name

            //id of question that we trying to add to graf
            let searchId = this.state.selected.idd

            const findNodebyId = function(searchId, newData) {
                let j,
                    currentChild,
                    result;


                if (searchId === newData.idd) {
                    newData.children.push({name: data.addQst.value, idd: data.addQst._id, answer: data.answer, children: []})
                } else {

                    for (j = 0; j < newData.children.length; j += 1) {
                        currentChild = newData.children[j];

                        // Search in the current child
                        result = findNodebyId(searchId, currentChild);
                    }

                    // The node has not been found and we have no more options
                    return false;
                }
            }

            findNodebyId(searchId, newData)


            this.setState({
                data: newData
            })
        }
        else {
            alert("Select node")
        }


    }

    removeNode = () => {
        this.setState({transitionDuration: 300})
        let newData = {...this.state.data}
        let searchId = this.state.selected.idd

        const findNodeById = function(searchId, newData) {
            let j,
                currentChild,
                result

            if (searchId === newData.idd) {
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

    coloriseNode = (nodeKey) => {
        let newData = {...this.state.data}
        this.setState({transitionDuration: 0})
        let searchId = nodeKey.idd

        const findNodeById = function(searchId, newData) {
            let j, currentChild

            if (searchId === newData.idd) {
                newData.nodeSvgShape = {
                    shape: 'circle',
                    shapeProps: {
                        r: 20,
                        fill:"red"
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
        this.setState({isOpen: true})
    }

    closeAddNodeForm = () => {
        this.setState(( { isOpen } ) => {
            return {isOpen: !isOpen }
        })
    }

    saveAddNode = data => {

        this.addNode(data)

        this.props.onAddNode(data, this.state.data)

        this.closeAddNodeForm()
    }

    render() {
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
                            <Chip
                                className="grafChip"
                                color="secondary"
                                label={ this.props.activeProject.value ? this.props.activeProject.value : 'Choose project' }
                            />
                        </Typography>
                        <div>
                            <Fab
                                color="secondary"
                                size="small"
                                aria-label="Add"
                                onClick={this.openAddNodeForm}
                                className="grafToolBarBtm"
                            >
                                <AddIcon />
                            </Fab>
                            <Fab
                                color="secondary"
                                size="small"
                                aria-label="Edit"
                                onClick={this.removeNode}
                                className="grafToolBarBtm"
                            >
                                <DeleteIcon fontSize="small" />
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
                        currentQst = { this.state.selected.idd }
                        questions  = { this.props.questions }
                        answers    = { this.props.nodes }
                        isOpen     = { this.state.isOpen }
                        onAdd      = { this.saveAddNode }
                        onClose    = { this.closeAddNodeForm }
                    />
                    : null
                }
            </div>
        )
    }
}

export default GrafD3
