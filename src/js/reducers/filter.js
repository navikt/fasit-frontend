import {
    SET_FILTER_CONTEXT,
    CHANGE_FILTER,
    CHANGE_PAGE,
} from '../actionTypes'
export const initialState = {
    activePage: 0,
    context: '',
    filters: {
        environment: '',
        environmentclass: '',
        type: '',
        resourcetype: '',
        application: '',
        zone: '',
        alias: ''
    }
}
export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PAGE:
            return Object.assign({}, state, {
                activePage: action.value
            })
        case SET_FILTER_CONTEXT:
            return Object.assign({}, state, {
                context: action.value
            })
        case CHANGE_FILTER: {
            const filters = Object.assign({}, state.filters, {
                [action.filterName]: action.filterValue
            })

            return Object.assign({}, state, {
                filters
            })
        }
        default:
            return state
    }
}
