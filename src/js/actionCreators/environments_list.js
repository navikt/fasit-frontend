import {
    ENVIRONMENTS_LIST_REQUEST
} from '../actionTypes'

export const fetchEnvironmentsList = (filters) => (dispatch) =>  {
    const filterString = buildFilterString(filters)
    dispatch({type: ENVIRONMENTS_LIST_REQUEST, filterString})
}

const buildFilterString = (filters) => {
    let filterString = '?'
    if (filters['environmentclass'])
        filterString += "environmentclass=" + filters['environmentclass'] + "&"

    return filterString
}
