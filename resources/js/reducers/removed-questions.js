import {SET_DELETED_QST} from "../actions/trash";

export default function (state = [], action = {}) {
    switch (action.type) {
        case SET_DELETED_QST: return action.payload
        default: return state
    }
}
