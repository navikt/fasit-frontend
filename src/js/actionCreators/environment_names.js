import {
    ENVIRONMENT_NAMES_REQUEST
} from '../actionTypes'
import {buildFilterString} from '../utils'

export const fetchEnvironmentNames = (filters) => (dispatch) => {
    const filterList = ['environmentclass']
    const filterString = buildFilterString(filters, filterList)
    dispatch({type: ENVIRONMENT_NAMES_REQUEST, filterString})
}
