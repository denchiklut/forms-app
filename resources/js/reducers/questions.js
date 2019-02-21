import { ADD_QUESTION, SET_QUESTIONS, DELETE_QUESTION, UPDATE_QUESTION } from "../actions/questions";

export default function (state = [], action = {}) {
    switch (action.type) {
        case SET_QUESTIONS:   return action.payload
        case ADD_QUESTION:    return state.concat(action.payload)
        case DELETE_QUESTION: return state.filter((item) => item._id !== action.payload._id)
        case UPDATE_QUESTION: return state.map((question) => question._id === action.payload._id ? {...question, name:action.payload.name}:question)

        default:  return state
    }

}
