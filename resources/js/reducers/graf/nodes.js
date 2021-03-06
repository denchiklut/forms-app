import { SET_NODES, ADD_NODE, REMOVE_NODE } from "../../actions/graf/nodes";

export default function (state = {}, action = {}) {
    switch (action.type) {
        case SET_NODES:   return action.payload
        case ADD_NODE:    return action.payload.value
        case REMOVE_NODE: return action.payload.value

        default:  return state
    }

}
