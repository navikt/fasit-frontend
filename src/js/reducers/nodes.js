import {
    NODES_LIST_FETCHING,
    NODES_LIST_RECEIVED,
    NODES_LIST_FAILED,
} from '../actionTypes'

export default (state = {
    isFetching: false,
    requestFailed: false,
    data: []
}, action) => {
    switch (action.type) {

        case 'NODES_LIST_FETCHING':
            return Object.assign({}, state, {
                isFetching: true,
                requestFailed: false,
                data: []
            })

        case 'NODES_LIST_RECEIVED':
            return Object.assign({}, state, {
                isFetching: false,
                data: action.value
            })


        case 'NODES_LIST_FAILED':
            return Object.assign({}, state, {
                isFetching: false,
                requestFailed: action.value
            })

        default:
            return state
    }
}
