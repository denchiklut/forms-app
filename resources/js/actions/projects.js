import axios from "axios";

export const SET_PTOJECTS ="SET_PTOJECTS"
export const PROJECT_SELECTED ="PROJECT_SELECTED"


export const selectProject = ( project ) => {
    return {
        type: PROJECT_SELECTED,
        payload: project
    }
}


export const fetchProjects = () => async dispatch => {
    const result = await axios.get(`https://lk.reffection.com/api/project/list`)
    dispatch({ type: SET_PTOJECTS, payload: result.data })
}
