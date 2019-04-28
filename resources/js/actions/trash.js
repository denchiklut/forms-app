import axios from "axios";

export const SET_DELETED_QST = "SET_DELETED_QST";
export const SET_DELETED_OBJ = "SET_DELETED_OBJ";
export const SET_DELETED_AVT = "SET_DELETED_AVT";


export const fetchDelQuestions = project => async dispatch =>{
    const result = await axios.get(`/api/rm_questions/${project}`)
    dispatch({ type: SET_DELETED_QST, payload: result.data })
}

export const fetchDelObj = () => async dispatch =>{
    const result = await axios.get(`/api/rm_objects`)
    dispatch({ type: SET_DELETED_OBJ, payload: result.data })
}

export const fetchDelAvto = () => async dispatch =>{
    const result = await axios.get(`/api/rm_avto`)
    dispatch({ type: SET_DELETED_AVT, payload: result.data })
}
