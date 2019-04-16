import { SIGN_IN } from "../actions/auth/google";

export const authMiddleware = store => next => action => {
    const users = [
        'ordalienka@gmail.com',
        'valeriasivash@gmail.com',
        'dprohorenko72@gmail.com',
        'uermolaeva766@gmail.com',
        'd0302180@gmail.com',
        'corwis@gmail.com',
        '88asorokina88@gmail.com',
        'j.volk1555@gmail.com',
        'denchiklut@gmail.com',
    ]

    if (action.type === SIGN_IN) {
        if (users.indexOf(action.payload.email) !== -1) next(action);
        return true;
    }

    next(action);
}
