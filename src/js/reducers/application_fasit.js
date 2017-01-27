import {
    APPLICATION_FASIT_FETCHING,
    APPLICATION_FASIT_RECEIVED,
    APPLICATION_FASIT_REQUEST_FAILED,
} from '../actionTypes'

export default (state = {
    data: {},
    isFetching: false,
    requestFailed: false,
}, action) => {
    switch (action.type) {

        case APPLICATION_FASIT_RECEIVED:
            return Object.assign({}, state, {
                data: action.value,
                isFetching: false,
                requestFailed: false
            })

        case APPLICATION_FASIT_FETCHING:
            return Object.assign({}, state, {
                data: {},
                isFetching: true,
                requestFailed: false
            })

        case APPLICATION_FASIT_REQUEST_FAILED:
            return Object.assign({}, state, {
                requestFailed: action.error.message,
                data: {},
                isFetching: false
            })
        default:
            return state
    }
}