import React, { Component } from 'react';
import Tree from 'react-d3-tree';
// import Tree from 'react-tree-graph'
import {FABButton, Header, Icon} from "react-mdl";

class GrafD3 extends Component {

    state = {
        selected: null,
        data:  {
            name: 'Вопрос 1',
            children: [
                {
                    name: 'Вопрос 2' ,
                    children: []
                },
                {
                    name: 'Вопрос 3' ,
                    children: []
                }

            ],
        }
    }


    // addNode = () => {
    //     if (this.state.selected) {
    //         let newData = Object.assign({},  this.state.data)
    //
    //         let searchField = "name"
    //         let searchVal = this.state.selected.name
    //
    //         for (let i = 0; i < newData.children.length; i++)
    //         {
    //
    //             console.log("searchVal: ", searchVal)
    //             console.log("searchField: ", newData.children[i][searchField])
    //
    //             if (newData.children[i][searchField] === searchVal) {
    //                 console.log(newData.children)
    //                 newData.children[i].children.push({name: 'Вопрос', children: []})
    //             }
    //         }
    //
    //         this.setState({
    //             data: newData
    //
    //         })
    //     }
    //     else {
    //         alert("Select node")
    //     }
    //
    //
    // }

    addNode = () => {
        if (this.state.selected) {
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

    click = (nodeKey) => {
        this.setState({selected: nodeKey})
        console.log(this.state.selected)
    }

    render() {
        return (<div id="treeWrapper" style={{width: '100%', height: '78vh', background: 'rgb(236, 236, 236)', boxShadow: '2px 1px 2px 2px #00000057'}}>
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
                        onClick={this.click}
                        collapsible={false}
                    />
                </div>)
        }
    }



export default GrafD3
