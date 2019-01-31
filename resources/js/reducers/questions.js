import { SET_QUESTIONS } from "../actions";

export default function (state = [], action = {}) {
    switch (action.type) {

        case SET_QUESTIONS:
            return action.questions
            break
        default:  return state
    }

}
