import { SET_DELETED } from "../actions/trash";

const INITIAL_STATE = {
    avto: [],
    objects: [],
    questions: []
}

export default function (state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case SET_DELETED: return action.payload
        default: return state
    }
}
