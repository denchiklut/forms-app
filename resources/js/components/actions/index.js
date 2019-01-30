export const selectQuestion = (question) => {
   return {
        type: "QUESTION_SELECTED",
        payload: question
    }
}
