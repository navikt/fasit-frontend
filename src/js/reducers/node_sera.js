import {
    NODE_SERA_RECEIVED,
    NODE_SERA_FETCHING,
    NODE_SERA_REQUEST_FAILED,
} from '../actionTypes'

export default (state = {}, action) => {
    switch (action.type) {
        case NODE_SERA_RECEIVED:
            return Object.assign({}, state, {
                data: action.value[0],
                isFetching: false,
                requestFailed: false
            })
        case NODE_SERA_FETCHING:
            return Object.assign({}, state, {
                data: {},
                isFetching: true,
                requestFailed: false
            })
        case NODE_SERA_REQUEST_FAILED:
            return Object.assign({}, state, {
                requestFailed: action.error.message,
                data: {},
                isFetching:false
            })

        default:
            return state
    }
}