import axios from "axios";

export const SET_OBJECTS = "SET_OBJECTS"
export const OBJECT_SELECTED = "OBJECT_SELECTED"
export const ADD_OBJECT = "ADD_OBJECT"
export const DELETE_OBJECT = "DELETE_OBJECT"
export const UPDATE_OBJECT = "UPDATE_OBJECT"

export const selectObject = object => {
    return { type: OBJECT_SELECTED, payload: object }
}


export const fetchObjects = () => async dispatch => {
    const result = await axios.get(`/api/objects/`)
    dispatch({ type: SET_OBJECTS, payload: result.data })
}



export const fetchAddObject = newObject => async dispatch => {
    const result = await axios.post('/api/objects', newObject)
    dispatch({ type: ADD_OBJECT, payload: result.data })
}


export const fetchDeleteObject = delObject => async dispatch => {
    await axios.delete(`/api/objects/${delObject._id}`)
    dispatch({ type: DELETE_OBJECT, payload: delObject })
}


export const fetchUpdateObject = object => async dispatch =>{
    await axios.patch(`/api/objects/${object._id}`, object)
    dispatch({ type: UPDATE_OBJECT, payload: object })
}

