import {CHANGE_FILTER, CHANGE_PAGE, CLEAR_FILTERS, SET_FILTER, SET_FILTER_CONTEXT} from '../actionTypes'

export const initialState = {
    activePage: 0,
    context: '',
    filters: {
        environment: '',
        environmentclass: '',
        type: '',
        resourcetype: '',
        status: '', 
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
        case SET_FILTER: {
            return Object.assign({}, state, { filters: action.filter })
        }
        case CLEAR_FILTERS:
            return Object.assign({}, state, { filters: initialState.filters })
        default:
            return state
    }
}
