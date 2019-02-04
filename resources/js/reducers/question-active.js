import {QUESTION_SELECTED} from "../actions";

export default function (state = {}, action = {}) {
    switch (action.type) {
        case QUESTION_SELECTED: return action.question
        default: return state

    }
}
