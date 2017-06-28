import {
    SHOW_KEYBOARD_SHORTCUTS,
} from '../actionTypes'

export const initialState = {
    displayShortcuts: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_KEYBOARD_SHORTCUTS:
            return Object.assign({}, state, {
                displayShortcuts: !state.displayShortcuts
            })
        default:
            return state
    }
}