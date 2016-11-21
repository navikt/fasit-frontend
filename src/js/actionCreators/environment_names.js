import {
    ENVIRONMENT_NAMES_REQUEST
} from '../actionTypes'

export const fetchEnvironmentNames = (filters) => (dispatch) => {
    let filterString = ''
    if (filters.environmentclass) {
        filterString = `?environmentclass=${filters.environmentclass}`
    }
    dispatch({type: ENVIRONMENT_NAMES_REQUEST, filterString})
}
