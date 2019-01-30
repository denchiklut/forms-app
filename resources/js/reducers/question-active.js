export default function (state = null, action) {
    switch (action.type) {
        case "QUESTION_SELECTED":
            return action.payload
            break
        default:
            return state

    }
}
