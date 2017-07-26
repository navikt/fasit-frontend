import {
    APPLICATION_NAMES_RECEIVED,
    APPLICATIONS_LIST_FAILED,
    APPLICATIONS_LIST_FETCHING,
    APPLICATIONS_LIST_RECEIVED,
    SHOW_NEW_APPLICATION_FORM
} from "../actionTypes";

export const initialState = {
    isFetching: true,
    requestFailed: false,
    data: [],
    headers: {},
    applicationNames: [],
    showNewApplicationForm: false,
    mode: "new"
}
export default (state = initialState, action) => {
    switch (action.type) {

        case APPLICATION_NAMES_RECEIVED:
            return Object.assign({}, state, {
                applicationNames: action.applicationNames
            })

        case APPLICATIONS_LIST_FETCHING:
            return Object.assign({}, state, {
                isFetching: true,
                requestFailed: false,
                data: []
            })

        case APPLICATIONS_LIST_RECEIVED:
            const sorted = action.page.data.sort(sortLowerCase)
            return Object.assign({}, state, {
                isFetching: false,
                data: sorted,
                headers: action.page.headers
            })

        case APPLICATIONS_LIST_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                requestFailed: action.value
            })

        case SHOW_NEW_APPLICATION_FORM:
            return Object.assign({}, state, {
                    showNewApplicationForm: action.value,
                    mode: action.mode
                }
            )

        default:
            return state
    }
}

const sortLowerCase = (first, second) => {
    if (first.name.toLowerCase() < second.name.toLowerCase()) return -1
    if (first.name.toLowerCase() > second.name.toLowerCase()) return 1
    return 0
}
