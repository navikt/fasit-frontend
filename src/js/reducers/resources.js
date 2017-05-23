import {
    RESOURCE_TYPES_RECEIVED,
    RESOURCES_LIST_FETCHING,
    RESOURCES_LIST_RECEIVED,
    RESOURCES_LIST_FAILED,
    SHOW_NEW_RESOURCE_FORM
} from '../actionTypes'

export const initialState = {
    isFetching: true,
    requestFailed: false,
    data: [],
    headers: {},
    resourceTypes: [],
    showNewResourceForm: false,
    copy: false,
}
export default (state = initialState, action) => {
    switch (action.type) {

        case RESOURCE_TYPES_RECEIVED:
            return Object.assign({}, state, {
                resourceTypes: action.value
            })

        case RESOURCES_LIST_FETCHING:
            return Object.assign({}, state, {
                isFetching: true,
                requestFailed: false,
                data: []
            })

        case RESOURCES_LIST_RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.page.data,
                headers: action.page.headers
            })


        case RESOURCES_LIST_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                requestFailed: action.value
            })

        case SHOW_NEW_RESOURCE_FORM:
            if (action.copy) {
                return Object.assign({}, state, {
                        showNewResourceForm: action.value,
                        copy: action.copy,
                    }
                )
            }
            return Object.assign({}, state, {
                    showNewResourceForm: action.value,
                    copy: false,
                }
            )

        default:
            return state
    }
}
