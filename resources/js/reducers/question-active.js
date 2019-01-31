import {QUESTION_SELECTED} from "../actions";

export default function (state = null, action) {
    switch (action.type) {
        case QUESTION_SELECTED:
            return action.question
            break
        default:
            return state

    }
}
