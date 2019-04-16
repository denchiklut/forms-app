export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OT'
export const UNKNOWN_USER = 'UNKNOWN_USER'

export const signIn = (profile) => {
    return {
        type: SIGN_IN,
        payload: profile
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}
