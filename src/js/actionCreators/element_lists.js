import {
    NODES_LIST_REQUEST,
    NODES_LIST_FETCHING,
    RESOURCES_LIST_REQUEST,
    RESOURCES_LIST_FETCHING,
    ENVIRONMENTS_LIST_FETCHING,
    APPLICATIONS_LIST_FETCHING,
    INSTANCES_LIST_FETCHING,
    CHANGE_PAGE
} from '../actionTypes'
import {buildFilterString} from '../utils'

export const clearNodesList = () => (dispatch) => dispatch({type: NODES_LIST_FETCHING})
export const clearResourcesList = () => (dispatch) => dispatch({type: RESOURCES_LIST_FETCHING})
export const clearEnvironmentsList = () => (dispatch) => dispatch({type: ENVIRONMENTS_LIST_FETCHING})
export const clearApplicationsList = () => (dispatch) => dispatch({type: APPLICATIONS_LIST_FETCHING})
export const clearInstancesList = () => (dispatch) => dispatch({type: INSTANCES_LIST_FETCHING})

export const fetchElementList = (filters, currentPage, type) => (dispatch) =>  {
    const filterList = {
        nodes: ["environment", "environmentclass", "type", "hostname"],
        resources: ["alias", "environment", "environmentclass", "zone", "application"]
    }
    const filterString = `?page=${currentPage}&pr_page=10&${buildFilterString(filters, filterList[type])}`
    switch(type){
        case "nodes":
            return dispatch({type: NODES_LIST_REQUEST, filterString})
        case "resources":
            return dispatch({type: RESOURCES_LIST_REQUEST, filterString})


    }
}

export const changePage = (page, lastPage) => (dispatch) => {
    if (page < 0) page = 0
    if (page > lastPage) page = lastPage
    dispatch({type: CHANGE_PAGE, value: page} )

}