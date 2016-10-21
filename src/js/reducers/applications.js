import {
    APPLICATIONS_LIST_FETCHING,
    APPLICATIONS_LIST_RECEIVED,
    APPLICATIONS_LIST_FAILED,
} from '../actionTypes'

export default (state = {
    isFetching: false,
    requestFailed: false,
    data: []
}, action) => {
    switch (action.type) {

        case 'APPLICATIONS_LIST_FETCHING':
            return Object.assign({}, state, {
                isFetching: true,
                requestFailed: false,
                data: []
            })

        case 'APPLICATIONS_LIST_RECEIVED':
            return Object.assign({}, state, {
                isFetching: false,
                data: action.value
            })


        case 'APPLICATIONS_LIST_FAILED':
            return Object.assign({}, state, {
                isFetching: false,
                requestFailed: action.value
            })

        default:
            return state
    }
}
