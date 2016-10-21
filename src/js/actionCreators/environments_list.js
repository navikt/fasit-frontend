import {
    ENVIRONMENTS_LIST_REQUEST
} from '../actionTypes'
import {buildFilterString} from '../utils'

export const fetchEnvironmentsList = (filters) => (dispatch) =>  {
    const filterList = ['environmentclass']
    const filterString = buildFilterString(filters, filterList)
    dispatch({type: ENVIRONMENTS_LIST_REQUEST, filterString})
}
