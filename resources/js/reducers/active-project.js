import {PROJECT_SELECTED} from "../actions/projects";

export default function (state = {}, action = {}) {
    switch (action.type) {
        case PROJECT_SELECTED: return action.payload
        default: return state

    }
}
