import { ADD_OBJECT, SET_OBJECTS, DELETE_OBJECT, UPDATE_OBJECT } from "../actions/objects";

export default function (state = [], action = {}) {
    switch (action.type) {
        case SET_OBJECTS:   return action.payload
        case ADD_OBJECT:    return state.concat(action.payload)
        case DELETE_OBJECT: return state.filter((item) => item._id !== action.payload._id)
        case UPDATE_OBJECT: return state.map((object) => object._id === action.payload._id ? {...object, value:action.payload.value, name:action.payload.name}:object)

        default:  return state
    }

}
