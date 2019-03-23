import { LOAD } from "../actions/edit-avto";

export default function (state = {}, action = {}) {
    switch (action.type) {
        case LOAD: return action.payload;
        default:   return state;
    }

}
