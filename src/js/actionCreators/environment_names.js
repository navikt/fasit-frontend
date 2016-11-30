import {
    ENVIRONMENT_NAMES_REQUEST
} from '../actionTypes'

export const fetchEnvironmentNames = (filters) => (dispatch) => {
    let filterString = ''
    if (filters.environmentclass) {
        filterString = `?pr_page=969&environmentclass=${filters.environmentclass}`
    }
    dispatch({type: ENVIRONMENT_NAMES_REQUEST, filterString})
}
