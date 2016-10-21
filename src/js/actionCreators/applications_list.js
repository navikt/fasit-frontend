import {
    APPLICATIONS_LIST_REQUEST
} from '../actionTypes'
import {buildFilterString} from '../utils'


export const fetchApplicationsList = (filters) => (dispatch) =>  {
    const filterList = ['application']
    const filterString = buildFilterString(filters, filterList)
    dispatch({type: APPLICATIONS_LIST_REQUEST, filterString})
}
