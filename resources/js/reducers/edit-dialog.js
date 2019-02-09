import {OPEN_EDIT_FORM, CLOSE_EDIT_FORM} from "../actions/dialogs";

export default function (state = false, action = {}) {
    switch (action.type) {
        case OPEN_EDIT_FORM: return action.payload
        case CLOSE_EDIT_FORM: return action.payload

        default: return state

    }
}
