import {SET_DELETED_OBJ} from "../actions/trash";

export default function (state = [], action = {}) {
    switch (action.type) {
        case SET_DELETED_OBJ: return action.payload
        default: return state
    }
}
