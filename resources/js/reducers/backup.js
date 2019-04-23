import { STORE_BACKUP } from "../actions/backaup"
import { GET_BACKUP } from "../actions/backaup"

export default function (state = [], action = {}) {
    switch (action.type) {
        case GET_BACKUP: return action.payload
        case STORE_BACKUP: return state.concat(action.payload)

        default: return state
    }
}

