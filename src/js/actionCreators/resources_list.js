import {
    RESOURCES_LIST_REQUEST
} from '../actionTypes'
import {buildFilterString} from '../utils'


export const fetchResourcesList = (filters) => (dispatch) =>  {
    const filterList = ["alias", "environment", "environmentclass", "zone", "application"]
    const filterString = buildFilterString(filters, filterList)
    dispatch({type: RESOURCES_LIST_REQUEST, filterString})
}
