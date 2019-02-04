import axios from "axios";

export const SET_QUESTIONS = "SET_QUESTIONS"
export const QUESTION_SELECTED = "QUESTION_SELECTED"
export const ADD_QUESTION = "ADD_QUESTION"

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
