import axios from "axios";

export const SET_QUESTIONS = "SET_QUESTIONS"
export const QUESTION_SELECTED = "QUESTION_SELECTED"
export const ADD_QUESTION = "ADD_QUESTION"
export const DELETE_QUESTION = "DELETE_QUESTION"
export const UPDATE_QUESTION = "UPDATE_QUESTION"

export function setQuestions(questions) {
    return {
        type: SET_QUESTIONS,
        payload: questions
    }
}

export const selectQuestion = (question) => {
   return {
        type: QUESTION_SELECTED,
        payload: question
    }
}

export const addQuestion = (question) => {
    return {
        type: ADD_QUESTION,
        payload: question
    }
}

export const deleteQuestion = (delQuestion) => {
    return {
        type: DELETE_QUESTION,
        payload: delQuestion
    }
}

export const updateQuestion = (editQuestion) => {
    return {
        type: UPDATE_QUESTION,
        payload: editQuestion
    }
}

export function fetchQuestions(project) {
    // console.log(project) we will search questions from project
    return dispatch => {
        axios
            .get('/api/questions')
            .then(data => dispatch(setQuestions(data.data)))
            .catch((err)=>console.log(err))

    }
}


export function fetchAddQuestion(newQuestion) {
    return dispatch => {
        axios
            .post('/api/questions', newQuestion)
            .then(res => dispatch(addQuestion(res.data)))
            .catch((err)=>console.log(err))

    }
}

export function fetchDeleteQuestion(delQuestion) {
    return dispatch => {
        axios
            .delete(`/api/questions/${delQuestion.id}`)
            .then(res => dispatch(deleteQuestion(delQuestion)))
            .catch((err)=>console.log(err))

    }
}

export function fetchUpdateQuestion(question) {
    return dispatch => {
        axios
            .patch(`/api/questions/${question.id}`, question)
            .then(res => dispatch(updateQuestion(question)))
            .catch((err)=>console.log(err))

    }
}

