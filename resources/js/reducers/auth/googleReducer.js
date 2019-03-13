import { SIGN_IN, SIGN_OUT } from "../../actions/auth/google";
const INITIAL_STATE = {isSignedIn: null}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SIGN_IN: return {...action.payload, isSignedIn: true }
        case SIGN_OUT:return {...{}, isSignedIn: false}

        default: return state
    }
}
