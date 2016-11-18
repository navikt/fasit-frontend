import {
    NODES_LIST_REQUEST,
    CHANGE_PAGE
} from '../actionTypes'
import {buildFilterString} from '../utils'

export const fetchNodeList = (filters, currentPage) => (dispatch) =>  {
    const filterList = ["environment", "environmentclass", "type", "hostname"]
    const filterString = `?page=${currentPage}&pr_page=10&${buildFilterString(filters, filterList)}`
    dispatch({type: NODES_LIST_REQUEST, filterString})
}

export const changePage = (page, lastPage) => (dispatch) => {
    if (page < 0) page = 0
    if (page > lastPage) page = lastPage
    dispatch({type: CHANGE_PAGE, value: page} )

}