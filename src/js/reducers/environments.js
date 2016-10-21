import {
    ENVIRONMENTS_LIST_FETCHING,
    ENVIRONMENTS_LIST_RECEIVED,
    ENVIRONMENTS_LIST_FAILED,
    ENVIRONMENT_NAMES_RECEIVED,
} from '../actionTypes'

export default (state = {
    isFetching: false,
    requestFailed: false,
    data: [],
    zones: ['fss', 'sbs'],
    environmentClasses: ['u','t','q','p'],
    environmentNames: []
}, action) => {
    switch (action.type) {

        case ENVIRONMENT_NAMES_RECEIVED:
            return Object.assign({}, state, {
                environmentNames: action.value
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
                data: action.value
            })


        case ENVIRONMENTS_LIST_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                requestFailed: action.value
            })

        default:
            return state
    }
}
