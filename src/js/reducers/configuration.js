import {
    RECEIVE_CONFIGURATION,
    RECEIVE_CONFIGURATION_FAILED
} from '../actionTypes'

export default (state = {}, action) => {
    switch (action.type) {

        case RECEIVE_CONFIGURATION:
            return Object.assign({}, state, action.value)

        case RECEIVE_CONFIGURATION_FAILED:
            return Object.assign({}, state, action.value)

        default:
            return state
    }
}