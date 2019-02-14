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
        {id: 1,  value: 'Afghanistan' },
        {id: 2,  value: 'Aland Islands' },
        {id: 3,  value: 'Albania' },
        {id: 4,  value: 'Algeria' },
        {id: 5,  value: 'American Samoa' },
        {id: 6,  value: 'Andorra' },
        {id: 7,  value: 'Angola' },
        {id: 8,  value: 'Anguilla' },
        {id: 9,  value: 'Antarctica' },
        {id: 10, value: 'Antigua and Barbuda' },
        {id: 11, value: 'Argentina' },
        {id: 12, value: 'Armenia' },
        {id: 13, value: 'Aruba' },
        {id: 14, value: 'Australia' },
        {id: 15, value: 'Austria' },
        {id: 16, value: 'Azerbaijan' },
        {id: 17, value: 'Bahamas' },
        {id: 18, value: 'Bahrain' },
        {id: 19, value: 'Bangladesh' },
        {id: 2,  value: 'Barbados' },
        {id: 21, value: 'Belarus' },
        {id: 22, value: 'Belgium' },
        {id: 23, value: 'Belize' },
        {id: 24, value: 'Benin' },
        {id: 25, value: 'Bermuda' },
        {id: 26, value: 'Bhutan' },
        {id: 27, value: 'Bolivia, Plurinational State of' },
        {id: 28, value: 'Bonaire, Sint Eustatius and Saba' },
        {id: 29, value: 'Bosnia and Herzegovina' },
        {id: 30, value: 'Botswana' },
        {id: 31, value: 'Bouvet Island' },
        {id: 32, value: 'Brazil' },
        {id: 33, value: 'British Indian Ocean Territory' },
        {id: 34, value: 'Brunei Darussalam' },
    ]

    return dispatch => dispatch(setProjects(testData))
}
