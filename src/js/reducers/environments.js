import {
    ENVIRONMENTS_LIST_FETCHING,
    ENVIRONMENTS_LIST_RECEIVED,
    ENVIRONMENTS_LIST_FAILED,
    ENVIRONMENTS_RECEIVED,
    SHOW_NEW_CLUSTER_FORM,
    SHOW_NEW_ENVIRONMENT_FORM
} from '../actionTypes'

export const initialState = {
    isFetching: false,
    requestFailed: false,
    data: [],
    zones: ['fss', 'sbs'],
    environmentClasses: ['u', 't', 'q', 'p'],
    headers: {},
    environments: [],
    showNewEnvironmentForm: false,
    showNewClusterForm: false,
    mode: 'new'
}
export default (state = initialState, action) => {
    switch (action.type) {
        case ENVIRONMENTS_RECEIVED:
            return Object.assign({}, state, {
                environments: action.value.sort(sortEnvironmentsNaturally)
            })
        case ENVIRONMENTS_LIST_FETCHING:
            return Object.assign({}, state, {
                isFetching: true,
                requestFailed: false,
                data: []
            })
        case ENVIRONMENTS_LIST_RECEIVED:
            console.log("action", action)
            return Object.assign({}, state, {
                isFetching: false,
                data: action.page.data.sort(sortEnvironmentsNaturally),
                headers: action.page.headers
            })
        case ENVIRONMENTS_LIST_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                requestFailed: action.value
            })
        case SHOW_NEW_ENVIRONMENT_FORM:
            return Object.assign({}, state, {
                    showNewEnvironmentForm: action.value,
                    mode: action.mode
                }
            )
        case SHOW_NEW_CLUSTER_FORM:
            if (action.copy) {
                return Object.assign({}, state, {
                        showNewClusterForm: action.value,
                        copy: action.copy
                    }
                )
            }
            return Object.assign({}, state, {
                    showNewClusterForm: action.value,
                    copy: false
                }
            )

        default:
            return state
    }
}

function splitCharactersAndNumbers(name) {
    return name.split(/(\d+)/)
}

// sort environments naturally, first by envclass, then by name and number. Ex p, q1, q2, q10, u1, u2, a12
const sortEnvironmentsNaturally = (first, second) => {
    const firstEnvClass = first.environmentclass.toLowerCase()
    const secondEnvClass = second.environmentclass.toLowerCase()
    const firstEnvName = splitCharactersAndNumbers(first.name.toLowerCase())
    const secondEnvName = splitCharactersAndNumbers(second.name.toLowerCase())

    if (firstEnvClass !== secondEnvClass) {
        return firstEnvClass > secondEnvClass ? 1 : -1
    }

    for(let idx = 0; idx < firstEnvName.length; idx++) {
        if(firstEnvName[idx] !== secondEnvName[idx]) {
            if(!isNaN(firstEnvName[idx]) && !isNaN(secondEnvName[idx])) {
                return parseInt(firstEnvName[idx]) > parseInt(secondEnvName[idx]) ? 1 : -1
            }
            return firstEnvName[idx] > secondEnvName[idx] ? 1 : -1
        }
    }
    return 0
}
