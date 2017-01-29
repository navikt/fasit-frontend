import {
    APPLICATION_INSTANCES_FETCHING,
    APPLICATION_INSTANCES_RECEIVED,
    APPLICATION_INSTANCES_REQUEST_FAILED
} from '../actionTypes'

export default (state = {
    isFetching: true,
    requestFailed: false,
    data: [],
    headers: {},
}, action) => {
    switch (action.type) {


        case APPLICATION_INSTANCES_FETCHING:
            return Object.assign({}, state, {
                isFetching: true,
                requestFailed: false,
                data: []
            })

        case APPLICATION_INSTANCES_RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.value,
                headers: action.page.headers
            })

        case APPLICATION_INSTANCES_REQUEST_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                requestFailed: action.value
            })

        default:
            return state
    }
}
