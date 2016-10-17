import {
    NODES_LIST_REQUEST
} from '../actionTypes'

export const fetchNodeList = (filters) => (dispatch) =>  {
    const url = buildFilterString(filters)
    dispatch({type: NODES_LIST_REQUEST, url})
}

const buildFilterString = (filters) => {
    let filterString = '/api/v2/nodes/?page=0&pr_page=10&'
    let filterTypes = ["environment", "environmentclass", "type", "hostname"]
    for (let filter in filters) {
        if (filterTypes.indexOf(filter) !== -1) {
            if (filters[filter])
                filterString += filter + "=" + filters[filter] + "&"
        }
    }
    return filterString
}