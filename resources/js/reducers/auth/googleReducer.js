import { SIGN_IN, SIGN_OUT } from "../../actions/auth/google";
const INITIAL_STATE = {isSignedIn: null}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SIGN_IN: return {...state, isSignedIn: true }
        case SIGN_OUT:return {...state, isSignedIn: false}

        default: return state
    }
}
