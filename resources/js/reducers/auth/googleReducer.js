import { SIGN_IN, SIGN_OUT, UNKNOWN_USER } from "../../actions/auth/google";

export default function (state = {}, action) {
    switch (action.type) {
        case SIGN_IN: return {...action.payload, isSignedIn: true }
        case SIGN_OUT:return {...{}, isSignedIn: false}
        case UNKNOWN_USER: return { unknownUser: true }

        default: return state
    }
}
