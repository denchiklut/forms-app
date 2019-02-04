import {ADD_QUESTION, SET_QUESTIONS} from "../actions";

export default function (state = [], action = {}) {
    switch (action.type) {
        case SET_QUESTIONS: return action.questions

        case ADD_QUESTION: return state.concat(action.payload)

        default:  return state
    }

}
