import {
    SET_SEARCH_CONTEXT,
    CHANGE_FILTER,
    CHANGE_ALL_FILTERS,
    SET_SEARCH_STRING
} from '../actionTypes'
export default (state = {
    context: '',
    searchString: '',
    filters: {
        environment: '',
        environmentclass: '',
        type: '',
        resourcetype: '',
        hostname: '',
        cluster: '',
        unit: '',
        application: '',
        alias: '',
        zone: ''
    }
}, action) => {
    switch (action.type) {
        case SET_SEARCH_CONTEXT:
            return Object.assign({}, state, {
                context: action.value
            })
        case CHANGE_FILTER: {
            const filters = Object.assign({}, state.filters, {
                [action.filtername]: action.searchString
            })

            return Object.assign({}, state, {
                filters
            })
        }
        case CHANGE_ALL_FILTERS: {
            const filters = Object.assign({}, state.filters, {
                environment: action.searchString,
                hostname: action.searchString,
                alias: action.searchString,
            })
            return Object.assign({}, state, {
                filters
            })
        }
        case SET_SEARCH_STRING:
            return Object.assign({}, state, {
                searchString: action.value
            })

        default:
            return state
    }
}
