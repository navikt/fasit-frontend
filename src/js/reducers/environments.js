import {
    ENVIRONMENTS_LIST_FETCHING,
    ENVIRONMENTS_LIST_RECEIVED,
    ENVIRONMENTS_LIST_FAILED,
    ENVIRONMENTS_RECEIVED,
    SHOW_NEW_ENVIRONMENT_FORM
} from '../actionTypes'

export default (state = {
    isFetching: false,
    requestFailed: false,
    data: [],
    zones: ['fss', 'sbs'],
    environmentClasses: ['u','t','q','p'],
    headers: {},
    environments: [],
    showNewEnvironmentForm: false
}, action) => {
    switch (action.type) {

        case ENVIRONMENTS_RECEIVED:
            return Object.assign({}, state, {
                environments: action.value
            })

        case ENVIRONMENTS_LIST_FETCHING:
            return Object.assign({}, state, {
                isFetching: true,
                requestFailed: false,
                data: []
            })

        case ENVIRONMENTS_LIST_RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.page.data,
                headers: action.page.headers
            })


        case ENVIRONMENTS_LIST_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                requestFailed: action.value
            })

        case SHOW_NEW_ENVIRONMENT_FORM:
            return Object.assign({}, state, {
                showNewEnvironmentForm: action.value
                }
            )

        default:
            return state
    }
}
