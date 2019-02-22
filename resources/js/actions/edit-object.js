export const LOAD = "LOAD_EDIT_OBJECT"

export const fetchLoad = (data) => {
    return {
        type: LOAD,
        payload: data
    }
};
