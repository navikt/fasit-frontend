import {
    RECEIVE_CONFIGURATION,
    RECEIVE_CONFIGURATION_FAILED,
    TOGGLE_SIDEBAR
} from '../actionTypes'

export default (state = {
    sidebarMinimized:false
}, action) => {
    switch (action.type) {

        case RECEIVE_CONFIGURATION:
            return Object.assign({}, state, action.value)

        case RECEIVE_CONFIGURATION_FAILED:
            return Object.assign({}, state, action.value)

        case TOGGLE_SIDEBAR:
            return Object.assign({}, state,{
                sidebarMinimized: !state.sidebarMinimized
            })
        default:
            return state
    }
}