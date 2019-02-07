import {SET_PTOJECTS} from "../actions/projects";

export default function (state = [], action = {}) {
    switch (action.type) {
        case SET_PTOJECTS:   return action.payload

        default: return state
    }

}

