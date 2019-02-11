export const SET_PTOJECTS ="SET_PTOJECTS"
export const PROJECT_SELECTED ="PROJECT_SELECTED"

export function setProjects(projects) {
    return {
        type: SET_PTOJECTS,
        payload: projects
    }
}

export const selectProject = (project) => {
    return {
        type: PROJECT_SELECTED,
        payload: project
    }
}

export function fetchProjects() {

    let testData = [
        {id: 1, val: 'Afghanistan' },
        {id: 2, val: 'Aland Islands' },
        {id: 3, val: 'Albania' },
        {id: 4, val: 'Algeria' },
        {id: 5, val: 'American Samoa' },
        {id: 6, val: 'Andorra' },
        {id: 7, val: 'Angola' },
        {id: 8, val: 'Anguilla' },
        {id: 9, val: 'Antarctica' },
        {id: 10, val: 'Antigua and Barbuda' },
        {id: 11, val: 'Argentina' },
        {id: 12, val: 'Armenia' },
        {id: 13, val: 'Aruba' },
        {id: 14, val: 'Australia' },
        {id: 15, val: 'Austria' },
        {id: 16, val: 'Azerbaijan' },
        {id: 17, val: 'Bahamas' },
        {id: 18, val: 'Bahrain' },
        {id: 19, val: 'Bangladesh' },
        {id: 2, val: 'Barbados' },
        {id: 21, val: 'Belarus' },
        {id: 22, val: 'Belgium' },
        {id: 23, val: 'Belize' },
        {id: 24, val: 'Benin' },
        {id: 25, val: 'Bermuda' },
        {id: 26, val: 'Bhutan' },
        {id: 27, val: 'Bolivia, Plurinational State of' },
        {id: 28, val: 'Bonaire, Sint Eustatius and Saba' },
        {id: 29, val: 'Bosnia and Herzegovina' },
        {id: 30, val: 'Botswana' },
        {id: 31, val: 'Bouvet Island' },
        {id: 32, val: 'Brazil' },
        {id: 33, val: 'British Indian Ocean Territory' },
        {id: 34, val: 'Brunei Darussalam' },
    ]

    return dispatch => dispatch(setProjects(testData))
}
