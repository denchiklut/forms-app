export const SET_QUESTIONS = "SET_QUESTIONS"
export const QUESTION_SELECTED = "QUESTION_SELECTED"

export function setQuestions(questions) {
    return {
        type: SET_QUESTIONS,
        questions
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
        type: QUESTION_SELECTED,
        question
    }
}
