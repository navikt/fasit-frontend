import {
    INSTANCES_LIST_REQUEST
} from '../actionTypes'

export const fetchInstancesList = (filters) => (dispatch) =>  {
    const filterString = buildFilterString(filters)
    dispatch({type: INSTANCES_LIST_REQUEST, filterString})
}

const buildFilterString = (filters) => {
    let filterString = '?'
    let filterTypes = ["environment", "environmentclass", "application"]
    for (let filter in filters) {
        if (filterTypes.indexOf(filter) !== -1) {
            if (filters[filter])
                filterString += filter + "=" + filters[filter] + "&"
        }
    }
    return filterString
}
