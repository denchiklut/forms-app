import axios from "axios";

export const SET_DELETED = "SET_DELETED";
export const RESTORE_DELETED = "RESTORE_DELETED";

export const fetchDeleted = project => async dispatch =>{
    const result = await axios.get(`/api/removed/${project}`)
    dispatch({ type: SET_DELETED, payload: result.data })
}


export const fetchRestoreFromTresh = (project, data) => async dispatch =>{
    console.log(project, data)
    const result = await axios.post(`/api/removed/${project}`, data)
    dispatch({ type: RESTORE_DELETED, payload: result.data })
}
