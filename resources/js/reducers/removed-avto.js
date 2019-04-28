import {SET_DELETED_AVT} from "../actions/trash";

export default function (state = [], action = {}) {
    switch (action.type) {
        case SET_DELETED_AVT: return action.payload
        default: return state
    }
}
