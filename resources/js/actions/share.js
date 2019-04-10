export const SHARE_PROJECT = "SHARE_PROJECT"

export const shareProj = isShare => {
    return {
        type: SHARE_PROJECT,
        payload: isShare
    }
}
