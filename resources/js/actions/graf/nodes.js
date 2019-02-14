import axios from "axios";
export const SET_NODES ="SET_NODES"
export const ADD_NODE ="ADD_NODE"


export function setNodes(nodes) {
    return {
        type: SET_NODES,
        payload: nodes
    }
}

export function addNode(node) {
    return {
        type: ADD_NODE,
        payload: node
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

export function onAddNode( node ) {
    return dispatch => {
        dispatch(addNode( node ))
    }
}
