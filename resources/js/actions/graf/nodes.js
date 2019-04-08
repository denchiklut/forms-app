import axios from "axios";
export const SET_NODES ="SET_NODES"
export const ADD_NODE ="ADD_NODE"
export const REMOVE_NODE ="REMOVE_NODE"
export const SELECT_NODE ="SELECT_NODE"


export const fetchNodes = project => async dispatch => {
    const result = await axios.get(`/api/nodes/${project}`)
    dispatch({ type: SET_NODES, payload: result.data })
}


export const onAddNode = ( node, graf ) => async dispatch => {
    const result = await axios.post('/api/nodes', {data: graf})
    dispatch({ type: ADD_NODE, addedNode: node, payload: result.data })
}


export const onRemoveNode = ( node, graf ) => async dispatch => {
    const result = await axios.post('/api/nodes', {data: graf})
    dispatch({ type: REMOVE_NODE, removedNode: node, payload: result.data })

}

export const selectNode = node => dispatch => {
    dispatch({ type: SELECT_NODE, payload: node })
}
