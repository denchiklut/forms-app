import axios from "axios";

export const SET_QUESTIONS = "SET_QUESTIONS"
export const QUESTION_SELECTED = "QUESTION_SELECTED"
export const ADD_QUESTION = "ADD_QUESTION"
export const DELETE_QUESTION = "DELETE_QUESTION"
export const UPDATE_QUESTION = "UPDATE_QUESTION"

export const selectQuestion = (question) => {
    return {
        type: QUESTION_SELECTED,
        payload: question
    }
}

export const fetchQuestions = project => async dispatch =>{
    console.log('%c fetchQuestions ',
        'color: white; background-color: #95B46A',
        project )
    const result = await axios.get(`/api/questions/${project}`)
    dispatch({ type: SET_QUESTIONS, payload: result.data })
}


export const fetchAddQuestion = newQuestion => async dispatch => {
    const result = await axios.post('/api/questions', newQuestion)
    dispatch({ type: ADD_QUESTION, payload: result.data })
}


export const fetchDeleteQuestion = delQuestion => async dispatch => {
    await axios.delete(`/api/questions/${delQuestion._id}`)
    dispatch({ type: DELETE_QUESTION, payload: delQuestion })
}


export const fetchUpdateQuestion = question => async dispatch => {
    await axios.patch(`/api/questions/${question._id}`, question)
    dispatch({ type: UPDATE_QUESTION, payload: question })
}

