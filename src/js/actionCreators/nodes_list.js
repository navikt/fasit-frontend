import {
    NODES_LIST_REQUEST
} from '../actionTypes'

export const fetchNodeList = (filters) => (dispatch) =>  {
    const filterString = buildFilterString(filters)
    dispatch({type: NODES_LIST_REQUEST, filterString})
}

const buildFilterString = (filters) => {
    let filterString = '?page=0&pr_page=10&'
    let filterTypes = ["environment", "environmentclass", "type", "hostname"]
    for (let filter in filters) {
        if (filterTypes.indexOf(filter) !== -1) {
            if (filters[filter])
                filterString += filter + "=" + filters[filter] + "&"
        }
    }
    return filterString
}