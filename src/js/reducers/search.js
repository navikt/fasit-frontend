import {
    SET_SEARCH_CONTEXT,
    CHANGE_FILTER,
    CHANGE_PAGE,
    SET_SEARCH_STRING
} from '../actionTypes'
export const initialState = {
    activePage: 0,
    context: '',
    searchString: '',
    filters: {
        environment: '',
        environmentclass: '',
        type: '',
        resourcetype: '',
        application: '',
        zone: ''
    }
}
export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PAGE:
            return Object.assign({}, state, {
                activePage: action.value
            })
        case SET_SEARCH_CONTEXT:
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
        case SET_SEARCH_STRING:
            return Object.assign({}, state, {
                searchString: action.searchString
            })

        default:
            return state
    }
}
