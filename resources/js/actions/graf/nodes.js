import axios from "axios";

export const SET_NODES ="SET_NODES"


export function setNodes(nodes) {
    console.log('Action setNodes', nodes)
    return {
        type: SET_NODES,
        payload: nodes
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
