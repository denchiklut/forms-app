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
        { val: 'Afghanistan' },
        { val: 'Aland Islands' },
        { val: 'Albania' },
        { val: 'Algeria' },
        { val: 'American Samoa' },
        { val: 'Andorra' },
        { val: 'Angola' },
        { val: 'Anguilla' },
        { val: 'Antarctica' },
        { val: 'Antigua and Barbuda' },
        { val: 'Argentina' },
        { val: 'Armenia' },
        { val: 'Aruba' },
        { val: 'Australia' },
        { val: 'Austria' },
        { val: 'Azerbaijan' },
        { val: 'Bahamas' },
        { val: 'Bahrain' },
        { val: 'Bangladesh' },
        { val: 'Barbados' },
        { val: 'Belarus' },
        { val: 'Belgium' },
        { val: 'Belize' },
        { val: 'Benin' },
        { val: 'Bermuda' },
        { val: 'Bhutan' },
        { val: 'Bolivia, Plurinational State of' },
        { val: 'Bonaire, Sint Eustatius and Saba' },
        { val: 'Bosnia and Herzegovina' },
        { val: 'Botswana' },
        { val: 'Bouvet Island' },
        { val: 'Brazil' },
        { val: 'British Indian Ocean Territory' },
        { val: 'Brunei Darussalam' },
    ]

    return dispatch => dispatch(setProjects(testData))
}
