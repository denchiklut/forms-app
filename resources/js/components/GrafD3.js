import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import {FABButton, Header, Icon} from "react-mdl";


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
            children: [
                {
                    name: 'Вопрос 2' ,
                    children: [],

                },
                {
                    name: 'Вопрос 3' ,
                    children: [],
                },

            ],
        }
    }

    addNode = () => {
        if (this.state.selected) {
            this.setState({transitionDuration: 300})
            let newData = Object.assign({},  this.state.data)
            let searchVal = this.state.selected.name

            console.log("searchVal: ", searchVal)
            console.log("========", newData.name)

            const findNode = function(searchVal, newData) {
                let j,
                    currentChild,
                    result;


                if (searchVal == newData.name) {
                    newData.children.push({name: `Вопрос${33+Math.random()}`, children: []})
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

            if (searchVal == newData.name) {
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

            if (searchVal == newData.name) {
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
        return (<div id="treeWrapper" style={{width: '100%', background: 'rgb(236, 236, 236)', boxShadow: '2px 1px 2px 2px #00000057'}}>
                    <Header style={{backgroundColor: 'rgb(95, 96, 103)'}} title={<span><span style={{ color: '#ddd'}}>Панель управления / </span><strong>Название проекта</strong></span>}>
                        <FABButton colored ripple mini style={{margin: "0 10px"}}
                                   onClick={this.addNode}>
                            <Icon name="add" />
                        </FABButton>

                        <FABButton colored ripple mini style={{margin: "0 10px"}}
                                   onClick={this.removeNode}>
                            <Icon name="delete" />
                        </FABButton>
                    </Header>
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

                </div>)
        }
    }



export default GrafD3
