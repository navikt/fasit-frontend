import {
    SET_ENVIRONMENT_CLASS,
    SET_ENVIRONMENT,
    SET_SEARCH_CONTEXT,
    CHANGE_FILTER,
    SET_SEARCH_STRING
} from '../actionTypes'
export default (state = {}, action) => {
    switch (action.type) {
        case SET_ENVIRONMENT_CLASS:
            return Object.assign({}, state, {
                envClass: action.value
            })
        case SET_ENVIRONMENT:
            return Object.assign({}, state, {
                environment: action.value
            })
        case SET_SEARCH_CONTEXT:
            return Object.assign({}, state, {
                context: action.value
            })
        case CHANGE_FILTER:
        {
            const filters = Object.assign({}, state.filters, {
                [action.value.filtername]: action.value.filtervalue
            })

            return Object.assign({}, state, {
                filters: filters
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
