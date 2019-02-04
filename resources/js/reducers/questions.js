import {ADD_QUESTION, SET_QUESTIONS, DELETE_QUESTION} from "../actions";

export default function (state = [], action = {}) {
    switch (action.type) {
        case SET_QUESTIONS: return action.questions
        case ADD_QUESTION: return state.concat(action.payload)
        case DELETE_QUESTION: return state.filter((item) => item.id !== action.payload.id)

        default:  return state
    }

}
