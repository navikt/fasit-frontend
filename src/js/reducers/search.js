export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_ENVIRONMENT_CLASS':
            return Object.assign({}, state, {
                envClass: action.value
            })
        case 'SET_ENVIRONMENT':
            return Object.assign({}, state, {
                environment: action.value
            })
        case 'SET_SEARCH_CONTEXT':
            return Object.assign({}, state, {
                context: action.value
            })
        case 'CHANGE_FILTER':
        {
            const filters = Object.assign({}, state.filters, {
                [action.value.filtername]: action.value.filtervalue
            })

            return Object.assign({}, state, {
                filters: filters
            })
        }
        case 'RECEIVE_ENVIRONMENT_NAMES':
            return Object.assign({}, state, {
                environmentNames: action.value
            })
        case 'RECEIVE_RESOURCE_TYPES':
            return Object.assign({}, state, {
                resourceTypes: action.value
            })
        case 'RECEIVE_NODE_TYPES':
            return Object.assign({}, state, {
                nodeTypes: action.value
            })
        case 'SET_SEARCH_STRING':
            return Object.assign({}, state, {
                searchString: action.value
            })

        default:
            return state
    }
}
