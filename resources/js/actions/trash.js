import axios from "axios";

export const SET_DELETED = "SET_DELETED";

export const fetchDeleted = project => async dispatch =>{
    const result = await axios.get(`/api/removed/${project}`)
    dispatch({ type: SET_DELETED, payload: result.data })
}
