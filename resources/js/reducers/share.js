import {SHARE_PROJECT} from "../actions/share"

export default function (state = {}, action = {}) {
    switch (action.type) {
        case SHARE_PROJECT: return action.payload

        default: return state
    }
}
