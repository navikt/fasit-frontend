export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_APPLICATION':
            return Object.assign({}, state, {
                active: action.value
            })
        case 'REQUEST_APPLICATIONS_LIST':
            return Object.assign({}, state, {
                isFetching: true,
                data: []
            })
        case 'RECEIVE_APPLICATIONS_LIST':
            return Object.assign({}, state, {
                isFetching: false,
                data: action.value
            })
        default:
            return state
    }
}
