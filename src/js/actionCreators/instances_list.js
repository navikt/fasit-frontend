import {
    INSTANCES_LIST_REQUEST
} from '../actionTypes'
import {buildFilterString} from '../utils'

export const fetchInstancesList = (filters) => (dispatch) =>  {
    const filterList = ["environment", "environmentclass", "application"]
    const filterString = buildFilterString(filters, filterList)
    dispatch({type: INSTANCES_LIST_REQUEST, filterString})
}
