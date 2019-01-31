export const SET_QUESTIONS = "SET_QUESTIONS"

export function setQuestions(questions) {
    return {
        type: SET_QUESTIONS,
        payload: questions
    }
}

export function fetchQuestions() {
    return dispatch => {
        fetch('/api/questions')
            .then(res => res.json())
            .then(data => dispatch(setQuestions(data)))
    }
}

export const selectQuestion = (question) => {
   return {
        type: "QUESTION_SELECTED",
        payload: question
    }
}
