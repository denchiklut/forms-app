import axios from "axios";
export const SET_NODES ="SET_NODES"
export const ADD_NODE ="ADD_NODE"
export const REMOVE_NODE ="REMOVE_NODE"


export function setNodes(nodes) {
    return {
        type: SET_NODES,
        payload: nodes
    }
}

export function addNode(node, graf) {
    return {
        type: ADD_NODE,
        addedNode: node,
        payload: graf
    }
}

export function removeNode(node, graf) {
    return {
        type: REMOVE_NODE,
        removedNode: node,
        payload: graf
    }
}

export function fetchNodes(project) {
    return dispatch => {
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

export function onRemoveNode( node, graf ) {
    return dispatch => {
        axios
            .post('/api/nodes', {data: graf})
            .then(res => dispatch(removeNode(node, res.data)))
            .catch((err)=>console.log(err))

    }
}
