import React, {Component} from 'react';
import Tree from 'react-d3-tree'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Chip from "@material-ui/core/Chip"
import AppBar from '@material-ui/core/AppBar'
import LayersClear from '@material-ui/icons/LayersClear'
import uuid from "uuid"
import './reseted-graf.scss'

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


class ResetedGraf extends Component {

    state = {
        data: {
            idd:  0,
            name: '',
            answer: '',
            children: [],
            dopInformation: null
        },
        selected: [],

    }

    initGraf() {
        this.setState({data: {
                idd:  0,
                unique: uuid.v4(),
                name: 'Start',
                type: 'start',
                value: 'Start',
                answer: 'Start',
                children: [],
                dopInformation: {
                    value: "Дополнительная информация",
                    webValue: "<p>Дополнительная информация</p>"
                }
            }})
    }

    clr = (newData) => {
        let currentChild, i;

        if (newData.nodeSvgShape) {
            if (newData.nodeSvgShape.shapeProps) {
                if (newData.nodeSvgShape.shape !== "rect") {
                    newData.nodeSvgShape.shapeProps.fill = "#a94690"
                    newData.nodeSvgShape.shapeProps.stroke = "#837086"
                } else {
                    newData.nodeSvgShape.shapeProps.fill = "#21cbf3"
                    newData.nodeSvgShape.shapeProps.stroke = "#939fe4"
                }
            }

        }

        if (newData.children) {
            for (i = 0; i < newData.children.length; i ++) {
                currentChild = newData.children[i];
                this.clr(currentChild);
            }
        }


        this.setState({data: newData})
    }

    coloriseNode = (nodeArr, fill="#ca2750", stroke="#f50057") => {
        let newData = {...this.state.data}
        let searchIds = nodeArr.map(node => node.unique)

        const findNodeById = () => {
            // colorize matched nodes
            let color = (searchId, newData) => {
                let j, currentChild

                if (searchId === newData.unique) {
                    if (newData.nodeSvgShape) {
                        if (newData.nodeSvgShape.shape !== "rect") {
                            newData.nodeSvgShape = {
                                shape: 'circle',
                                shapeProps: {
                                    r: 10,
                                    fill: fill,
                                    stroke: stroke
                                },
                            }
                        } else if (newData.nodeSvgShape.shape === "rect") {
                            newData.nodeSvgShape = {
                                shape: 'rect',
                                shapeProps: {
                                    fill: fill,
                                    width: 20,
                                    height: 20,
                                    x: -10,
                                    y: -10,
                                }
                            }
                        }
                    }else {
                        newData.nodeSvgShape = {
                            shape: 'circle',
                            shapeProps: {
                                r: 10,
                                fill: fill,
                                stroke: stroke
                            },
                        }
                    }

                }

                if (newData.children) {
                    for (j = 0; j < newData.children.length; j ++) {
                        currentChild = newData.children[j];
                        color(searchId, currentChild);
                    }
                }
            }

            searchIds.map(searchId => color(searchId, newData))
        }

        findNodeById()

        this.setState({ data: newData });

    }

    click = (nodeKey, e) => {
        this.clr(this.state.data)

        if (e.altKey) {

            let arr = [...this.state.selected];

            if (arr.find(item => item.unique === nodeKey.unique) !== undefined) {
                this.setState({selected: [...arr.filter(item => item.unique !== nodeKey.unique)].sort((a, b) => a.depth - b.depth)},
                    () => this.coloriseNode(this.state.selected))
            } else {
                this.setState({selected: [...arr, nodeKey].sort((a, b) => a.depth - b.depth)},
                    () => this.coloriseNode(this.state.selected))
            }

            return true
        }

        this.setState({selected: [nodeKey]}, () => {
            this.coloriseNode(this.state.selected)
            this.props.showNode(nodeKey)
        })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.backup !== prevProps.backup) {
            this.setState({selected: [], data: this.props.backup.value})
        }

    }

    render() {
        if (!this.props.backup) {
            return <div className="backupEmpty">
                <LayersClear className="emIcon"/>
            </div>
        }
        return (
            <div id="treeWrapper" style={{ overflowY: 'hidden', height: 'calc(100vh - 64px)'}}>
                <AppBar position="static" style={{background: 'linear-gradient(to right, #536976, #292e49)'}}>
                    <Toolbar className='grafToolBar'>
                        <Typography variant="h6" className="grafToolBarChip">
                            <Chip
                                className="grafChip"
                                color="secondary"
                                label={this.props.backup ? this.props.backup.created_at : null}
                            />
                        </Typography>
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
            </div>
        );
    }
}

export default ResetedGraf;
