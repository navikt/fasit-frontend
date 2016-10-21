import {
    NODES_LIST_REQUEST
} from '../actionTypes'
import {buildFilterString} from '../utils'

export const fetchNodeList = (filters) => (dispatch) =>  {
    const filterList = ["environment", "environmentclass", "type", "hostname"]
    const filterString = buildFilterString(filters, filterList)
    dispatch({type: NODES_LIST_REQUEST, filterString})
}