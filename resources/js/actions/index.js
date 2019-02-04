import axios from "axios";

export const SET_QUESTIONS = "SET_QUESTIONS"
export const QUESTION_SELECTED = "QUESTION_SELECTED"
export const ADD_QUESTION = "ADD_QUESTION"
export const DELETE_QUESTION = "DELETE_QUESTION"
export const EDIT_QUESTION = "EDIT_QUESTION"

export function setQuestions(questions) {
    return {
        type: SET_QUESTIONS,
        questions
    }
}

export const selectQuestion = (question) => {
   return {
        type: QUESTION_SELECTED,
        question
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

export const editQuestion = (editQuestion) => {
    alert(editQuestion.val)
    return {
        type: EDIT_QUESTION,
        payload: editQuestion
    }
}

export function fetchQuestions() {
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
        dispatch(editQuestion(question))
        // axios
        //     .patch(`/api/questions/${editQuestion.id}`)
        //     .then(res => dispatch(updateQuestion(editQuestion)))
        //     .catch((err)=>console.log(err))

    }
}

