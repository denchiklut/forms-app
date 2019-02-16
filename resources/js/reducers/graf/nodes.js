import { SET_NODES, ADD_NODE } from "../../actions/graf/nodes";

export default function (state = [], action = {}) {
    switch (action.type) {
        case SET_NODES:   return action.payload
        // case ADD_NODE:    return action.payload
        // case DELETE_QUESTION: return state.filter((item) => item.id !== action.payload.id)
        // case UPDATE_QUESTION: return state.map((question) => question.id === action.payload.id ? {...question, val:action.payload.val}:question)

        default:  return state
    }

}
