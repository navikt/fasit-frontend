import {
    SET_ACTIVE_ENVIRONMENT,
    REQUEST_ENVIRONMENTS_LIST,
    RECEIVE_ENVIRONMENTS_LIST
} from '../actionTypes'

export default (state = {}, action) => {
    switch (action.type) {
        case SET_ACTIVE_ENVIRONMENT:
            return Object.assign({}, state, {
                active: action.value
            })
        case REQUEST_ENVIRONMENTS_LIST:
            return Object.assign({}, state, {
                isFetching: true,
                data: []
            })
        case RECEIVE_ENVIRONMENTS_LIST:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.value
            })
        default:
            return state
    }
}
