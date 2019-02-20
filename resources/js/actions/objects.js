import axios from "axios";

export const SET_OBJECTS = "SET_OBJECTS"
export const OBJECT_SELECTED = "OBJECT_SELECTED"
export const ADD_OBJECT = "ADD_OBJECT"
export const DELETE_OBJECT = "DELETE_OBJECT"
export const UPDATE_OBJECT = "UPDATE_OBJECT"

export function setObjects( objects ) {
    return {
        type: SET_OBJECTS,
        payload: objects
    }
}

export const selectObject = ( object ) => {
    return {
        type: OBJECT_SELECTED,
        payload: object
    }
}

export const addObject = (object) => {
    return {
        type: ADD_OBJECT,
        payload: object
    }
}

export const deleteObject = ( delObject ) => {
    return {
        type: DELETE_OBJECT,
        payload: delObject
    }
}

export const updateObject = ( editObject ) => {
    return {
        type: UPDATE_OBJECT,
        payload: editObject
    }
}

export function fetchObjects () {
    return dispatch => {
        axios
            .get(`/api/objects/`)
            .then(data => dispatch (setObjects(data.data)))
            .catch(( err ) => console.log ( err ))

    }
}


export function fetchAddObject ( newObject ) {
    return dispatch => {
        axios
            .post('/api/objects', newObject)
            .then(res => dispatch ( addObject( res.data ) ))
            .catch((err ) => console.log ( err ))

    }
}

export function fetchDeleteObject ( delObject ) {
    return dispatch => {
        axios
            .delete(`/api/objects/${delObject._id}`)
            .then(res => dispatch(deleteObject( delObject) ))
            .catch((err)=>console.log(err))

    }
}

export function fetchUpdateObject ( object ) {
    return dispatch => {
        axios
            .patch(`/api/objects/${object._id}`, object)
            .then(res => dispatch(updateObject(object)))
            .catch((err)=>console.log(err))

    }
}

