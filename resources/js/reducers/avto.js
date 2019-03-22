import { SET_AVTO, ADD_AVTO, DELETE_AVTO, UPDATE_AVTO } from "../actions/avto";

export default function (state = [], action = {}) {
    switch (action.type) {
        case SET_AVTO:   return action.payload
        case ADD_AVTO:    return state.concat(action.payload)
        case DELETE_AVTO: return state.filter((item) => item._id !== action.payload._id)
        case UPDATE_AVTO: return state.map((avto) => avto._id === action.payload._id ? {...avto, value:action.payload.value, name:action.payload.name}:avto)

        default:  return state
    }

}
