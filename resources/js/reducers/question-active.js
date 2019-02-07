import {QUESTION_SELECTED} from "../actions/questions";

export default function (state = {}, action = {}) {
    switch (action.type) {
        case QUESTION_SELECTED: return action.payload
        default: return state

    }
}
