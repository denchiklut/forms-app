import {OPEN_ADD_FORM, CLOSE_ADD_FORM} from "../actions/dialogs";

export default function (state = false, action = {}) {
    switch (action.type) {
        case OPEN_ADD_FORM: return action.payload
        case CLOSE_ADD_FORM: return action.payload

        default: return state

    }
}
