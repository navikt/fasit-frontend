export default (state = {}, action ) => {
    switch (action.type){
        case 'TOGGLE_SIDEBAR':
            return Object.assign({}, state,{
                sidebarMinimized: !state.sidebarMinimized
            })
        default: return state
    }
}