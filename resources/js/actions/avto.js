import axios from "axios";

export const SET_AVTO    = "SET_AVTO"
export const ADD_AVTO    = "ADD_AVTO"
export const DELETE_AVTO = "DELETE_AVTO"
export const UPDATE_AVTO = "UPDATE_AVTO"

export const fetchAvto = () => async dispatch => {
    const result = await axios.get(`/api/avto/`)
    dispatch({ type: SET_AVTO, payload: result.data })
}

export const fetchAddObject = newAvto => async dispatch => {
    const result = await axios.post('/api/avto', newAvto)
    dispatch({ type: ADD_AVTO, payload: result.data })
}


export const fetchDeleteObject = delAvto => async dispatch => {
    await axios.delete(`/api/avto/${delAvto._id}`)
    dispatch({ type: DELETE_AVTO, payload: delAvto })
}


export const fetchUpdateObject = avto => async dispatch =>{
    await axios.patch(`/api/avto/${avto._id}`, avto)
    dispatch({ type: UPDATE_AVTO, payload: avto })
}


