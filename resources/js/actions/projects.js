export const SET_PTOJECTS ="SET_PTOJECTS"
export const PROJECT_SELECTED ="PROJECT_SELECTED"

export function setProjects(projects) {
    return {
        type: SET_PTOJECTS,
        payload: projects
    }
}

export const selectProject = ( project ) => {
    return {
        type: PROJECT_SELECTED,
        payload: project
    }
}

export function fetchProjects() {

    let testData = [
        {_id: 3,  name: 'KVSSPB' },
        {_id: 1,  name: 'gk_mic' },
        {_id: 4,  name: 'Algeria' },
        {_id: 5,  name: 'Samoa' },
        {_id: 6,  name: 'Andorra' },
        {_id: 7,  name: 'Angola' },
        {_id: 8,  name: 'Anguilla' },
        {_id: 9,  name: 'Antarctica' },
        {_id: 11, name: 'Argentina' },
        {_id: 12, name: 'Armenia' },
        {_id: 13, name: 'Aruba' },
        {_id: 14, name: 'Australia' },
        {_id: 15, name: 'Austria' },
        {_id: 16, name: 'Azerbaijan' },
        {_id: 17, name: 'Bahamas' },
        {_id: 18, name: 'Bahrain' },
        {_id: 19, name: 'Bangladesh' },
        {_id: 2,  name: 'Barbados' },
        {_id: 21, name: 'Belarus' },
        {_id: 22, name: 'Belgium' },
        {_id: 23, name: 'Belize' },
        {_id: 24, name: 'Benin' },
        {_id: 25, name: 'Bermuda' },
        {_id: 26, name: 'Bhutan' },
        {_id: 30, name: 'Botswana' },
        {_id: 32, name: 'Brazil' },
    ]

    return dispatch => dispatch(setProjects(testData))
}
