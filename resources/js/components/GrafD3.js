import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';
import Chip from "@material-ui/core/Chip";


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
        data:  {
            name: 'Вопрос 1',
            idd: '1',
            val: 'Хотите Машину?',
            children: [
                {
                    name: 'Вопрос 2' ,
                    idd: '2',
                    val: 'Какого цвета?',
                    children: [],

                },
                {
                    name: 'Вопрос 3' ,
                    idd: '3',
                    val: 'Есть-ли у вас деньги?',
                    children: [],
                },

            ],
        }
    }

    addNode = () => {
        if (this.state.selected) {
            this.setState({transitionDuration: 300})
            let newData = {...this.state.data}
            let searchVal = this.state.selected.name

            //id of question that we trying to add to graf
            let searchId = this.state.selected.idd

            console.log("searchVal: ", searchVal)
            console.log("searchId: ", searchId)
            console.log("========", newData.name)

            const findNode = function(searchVal, newData) {
                let j,
                    currentChild,
                    result;


                if (searchVal === newData.name) {
                    newData.children.push({name: `Вопрос${Math.random()}`, children: []})
                } else {

                    for (j = 0; j < newData.children.length; j += 1) {
                        currentChild = newData.children[j];

                        // Search in the current child
                        result = findNode(searchVal, currentChild);
                    }

                    // The node has not been found and we have no more options
                    return false;
                }
            }

            findNode(searchVal, newData)

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
        let newData = Object.assign({},  this.state.data)
        let searchVal = this.state.selected.name

        const findNode = function(searchVal, newData) {
            let j,
                currentChild,
                result

            if (searchVal === newData.name) {
                return true
            }

            else {

                for (j = 0; j < newData.children.length; j += 1) {
                    currentChild = newData.children[j];
                    result = findNode(searchVal, currentChild);

                    if (result) {
                        console.log('currentChild',currentChild)
                        currentChild = null
                        newData.children.splice(j, 1)
                        return false
                    }
                }
                return false;
            }
        }

        findNode(searchVal, newData)

        this.setState({
            data: newData
        });

    }

    coloriseNode = (nodeKey) => {
        let newData = Object.assign({},  this.state.data)
        this.setState({transitionDuration: 0})
        let searchVal = nodeKey.name

        const findNode = function(searchVal, newData) {
            let j, currentChild

            if (searchVal === newData.name) {
                console.log("colorise current node", newData)
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
                findNode(searchVal, currentChild);
            }
        }

        findNode(searchVal, newData)

        this.setState({
            data: newData
        });

    }

    click = (nodeKey) => {
        this.setState({selected: nodeKey})
        this.coloriseNode(nodeKey)
        console.log("click", this.state.selected)
    }

    render() {
        return (
            <div id="treeWrapper" style={{width: '100%', height: 'calc(100vh - 64px)', background: 'rgb(236, 236, 236)',}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
                        <Chip
                            color="secondary"
                            label={this.props.activeProject.value ? this.props.activeProject.value : 'Choose project' }
                            style={{background: 'linear-gradient(to right, rgb(255, 95, 139), rgb(139, 119, 177))', fontSize:'16px', boxShadow: 'rgba(205, 48, 83, 0.19) 0px 3px 5px 2px'}}
                        />



                    </Typography>
                    <div>
                        <Fab
                             color="secondary"
                             size="small"
                             aria-label="Add"
                             onClick={this.addNode}
                             style={{margin: '8px'}}
                        >
                            <AddIcon />
                        </Fab>
                        <Fab
                             color="secondary"
                             size="small"
                             aria-label="Edit"
                             onClick={this.removeNode}
                             style={{margin: '8px'}}
                        >
                            <DeleteIcon fontSize="small" />
                        </Fab>
                    </div>
                </Toolbar>
            </AppBar>
            <Tree
                data={this.state.data}
                transitionDuration={0}
                scaleExtent={{min: 0.1, max: 8}}
                textLayout={{ x: 28, y: 0, }}
                orientation="vertical"
                onClick={this.click}
                collapsible={false}
                styles={svgStyle}
                />
          </div>
        )
        }
    }


function mapStateToProps(state) {
    return {
        activeProject: state.activeProject
    }
}

export default connect(mapStateToProps)(GrafD3)
