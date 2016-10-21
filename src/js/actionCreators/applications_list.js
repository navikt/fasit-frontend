import {
    APPLICATIONS_LIST_REQUEST
} from '../actionTypes'

export const fetchApplicationsList = (filters) => (dispatch) =>  {
    const filterString = buildFilterString(filters)
    dispatch({type: APPLICATIONS_LIST_REQUEST, filterString})
}

const buildFilterString = (filters) => {
    let filterString = '?'
    if (filters['application'])
        filterString += "name=" + filters['application'] + "&"

    return filterString
}
