import { LOAD } from "../actions/edit-object";

export default function (state = {}, action = {}) {
    switch (action.type) {
        case LOAD: return action.payload;
        default:   return state;
    }

}
