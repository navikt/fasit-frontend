import {
    RECEIVE_CONFIGURATION,
    RECEIVE_CONFIGURATION_FAILED,
    TOGGLE_SIDEBAR,
    CHANGE_PAGE
} from '../actionTypes'

export default (state = {
    sidebarMinimized:false,
    elementListPage: 0
}, action) => {
    switch (action.type) {
        case CHANGE_PAGE:
            return Object.assign({}, state, {
                elementListPage: action.value
            })
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