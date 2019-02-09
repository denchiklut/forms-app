export const OPEN_ADD_FORM = "OPEN_ADD_FORM";
export const CLOSE_ADD_FORM = "CLOSE_ADD_FORM";
export const OPEN_EDIT_FORM = "OPEN_EDIT_FORM";
export const CLOSE_EDIT_FORM = "CLOSE_EDIT_FORM";

export function openAddForm(isOpen) {
    return {
        type: OPEN_ADD_FORM,
        payload: isOpen
    }
}

export function closeAddForm(isOpen) {
    return {
        type: CLOSE_ADD_FORM,
        payload: isOpen
    }
}

export function openEditForm(isOpen) {
    return {
        type: OPEN_EDIT_FORM,
        payload: isOpen
    }
}

export function closeEditForm(isOpen) {
    return {
        type: CLOSE_EDIT_FORM,
        payload: isOpen
    }
}
