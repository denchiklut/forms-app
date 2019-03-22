import axios from "axios";

export const SET_AVTO    = "SET_AVTO"
export const ADD_AVTO    = "ADD_AVTO"
export const DELETE_AVTO = "DELETE_AVTO"
export const UPDATE_AVTO = "UPDATE_AVTO"

export const fetchAvto = () => async dispatch => {
    const result = await axios.get(`/api/avto/`)
    dispatch({ type: SET_AVTO, payload: result.data })
}
