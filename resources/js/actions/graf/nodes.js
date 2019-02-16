import axios from "axios";
export const SET_NODES ="SET_NODES"
export const ADD_NODE ="ADD_NODE"


export function setNodes(nodes) {
    return {
        type: SET_NODES,
        payload: nodes
    }
}

export function addNode(node, graf) {
    return {
        type: ADD_NODE,
        node: node,
        payload: graf
    }
}

export function fetchNodes(project) {
    return dispatch => {
        console.log(project)
        axios
            .get(`/api/nodes/${project}`)
            .then(data => dispatch(setNodes(data.data)))
            .catch((err)=>console.log(err))

    }
}

export function onAddNode( node, graf ) {
    return dispatch => {
        axios
            .post('/api/nodes', {data: graf})
            .then(res => dispatch(addNode(node, res.data)))
            .catch((err)=>console.log(err))

    }
}
