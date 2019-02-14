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
        {_id: 1,  value: 'Afghanistan' },
        {_id: 2,  value: 'Aland Islands' },
        {_id: 3,  value: 'Albania' },
        {_id: 4,  value: 'Algeria' },
        {_id: 5,  value: 'American Samoa' },
        {_id: 6,  value: 'Andorra' },
        {_id: 7,  value: 'Angola' },
        {_id: 8,  value: 'Anguilla' },
        {_id: 9,  value: 'Antarctica' },
        {_id: 10, value: 'Antigua and Barbuda' },
        {_id: 11, value: 'Argentina' },
        {_id: 12, value: 'Armenia' },
        {_id: 13, value: 'Aruba' },
        {_id: 14, value: 'Australia' },
        {_id: 15, value: 'Austria' },
        {_id: 16, value: 'Azerbaijan' },
        {_id: 17, value: 'Bahamas' },
        {_id: 18, value: 'Bahrain' },
        {_id: 19, value: 'Bangladesh' },
        {_id: 2,  value: 'Barbados' },
        {_id: 21, value: 'Belarus' },
        {_id: 22, value: 'Belgium' },
        {_id: 23, value: 'Belize' },
        {_id: 24, value: 'Benin' },
        {_id: 25, value: 'Bermuda' },
        {_id: 26, value: 'Bhutan' },
        {_id: 27, value: 'Bolivia, Plurinational State of' },
        {_id: 28, value: 'Bonaire, Sint Eustatius and Saba' },
        {_id: 29, value: 'Bosnia and Herzegovina' },
        {_id: 30, value: 'Botswana' },
        {_id: 31, value: 'Bouvet Island' },
        {_id: 32, value: 'Brazil' },
        {_id: 33, value: 'British Indian Ocean Territory' },
        {_id: 34, value: 'Brunei Darussalam' },
    ]

    return dispatch => dispatch(setProjects(testData))
}
