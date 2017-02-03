import {
    APPLICATIONS_LIST_FETCHING,
    APPLICATIONS_LIST_RECEIVED,
    APPLICATIONS_LIST_FAILED,
    APPLICATION_NAMES_RECEIVED,
    SHOW_NEW_APPLICATION_FORM
} from '../actionTypes'

export default (state = {
    isFetching: true,
    requestFailed: false,
    data: [],
    headers: {},
    applicationNames: [],
    showNewApplicationForm: false
}, action) => {
    switch (action.type) {

        case APPLICATION_NAMES_RECEIVED:
            return Object.assign({}, state, {
                applicationNames: action.applicationNames
            })

        case APPLICATIONS_LIST_FETCHING:
            return Object.assign({}, state, {
                isFetching: true,
                requestFailed: false,
                data: []
            })

        case APPLICATIONS_LIST_RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.page.data,
                headers: action.page.headers
            })

        case APPLICATIONS_LIST_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                requestFailed: action.value
            })

        case SHOW_NEW_APPLICATION_FORM:
            return Object.assign({}, state, {
                    showNewApplicationForm: action.value
                }
            )

        default:
            return state
    }
}
