import { SELECT_NODE } from '../actions/graf/nodes'

export default function (state = {}, action = {}) {
    switch (action.type) {
        case SELECT_NODE: return action.payload
        default: return state

    }
}
