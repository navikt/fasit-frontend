export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return Object.assign({}, state, action.value, {
                failedLogin: false
            })
        case 'FAILED_LOGIN':
            return Object.assign({}, state, {
                authenticated: false,
                failedLogin: true
            })
        default:
            return state
    }
}
