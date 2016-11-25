import {
    FETCH_ELEMENT_LISTS,
    NODES_LIST_REQUEST,
    NODES_LIST_FETCHING,
    RESOURCES_LIST_REQUEST,
    RESOURCES_LIST_FETCHING,
    ENVIRONMENTS_LIST_FETCHING,
    APPLICATIONS_LIST_FETCHING,
    APPLICATIONS_LIST_REQUEST,
    INSTANCES_LIST_FETCHING,
    INSTANCES_LIST_REQUEST,
    ENVIRONMENTS_LIST_REQUEST,
    CHANGE_PAGE,
    CHANGE_ALL_FILTERS,
    CHANGE_FILTER
} from '../actionTypes'

export const clearNodesList = () => (dispatch) => dispatch({type: NODES_LIST_FETCHING})
export const clearResourcesList = () => (dispatch) => dispatch({type: RESOURCES_LIST_FETCHING})
export const clearEnvironmentsList = () => (dispatch) => dispatch({type: ENVIRONMENTS_LIST_FETCHING})
export const clearApplicationsList = () => (dispatch) => dispatch({type: APPLICATIONS_LIST_FETCHING})
export const clearInstancesList = () => (dispatch) => dispatch({type: INSTANCES_LIST_FETCHING})

export const submitSearchString = (location, searchString, activePage) => (dispatch) => dispatch({type: FETCH_ELEMENT_LISTS, location, searchString, prPage: 10})

export const changeFilter = (filtername, searchString) => (dispatch) => {
    if (filtername === "all") dispatch({type:CHANGE_ALL_FILTERS, searchString})
    return dispatch({
        type: CHANGE_FILTER,
        filtername,
        searchString
    })
}
export const submitPageChange = (location, searchString) => (dispatch) => {dispatch({type: FETCH_ELEMENT_LISTS, location, searchString, prPage: 10})}
export const fetchAllElementLists = (searchString) => (dispatch) => dispatch({type: FETCH_ELEMENT_LISTS, location:"anything", searchString, prPage:1})

export const fetchElementList = (search, type) => (dispatch) =>  {
    const filterList = {
        nodes: ["environment", "environmentclass", "type"],
        resources: ["environment", "environmentclass", "zone", "application"],
        environments: ['environmentclass'],
        applications: ['application'],
        instances: ["environment", "environmentclass", "application"]
    }
    switch(type){
        case "nodes":
            const nodeParams = `?page=${search.activePage}&pr_page=10&hostname=${search.searchString}&${buildFilterString(search.filters, filterList[type])}`
            return dispatch({type: NODES_LIST_REQUEST, filterString: nodeParams})
        case "resources":
            const resourceParams = `?page=${search.activePage}&pr_page=10&alias=${search.searchString}&${buildFilterString(search.filters, filterList[type])}`
            return dispatch({type: RESOURCES_LIST_REQUEST, filterString: resourceParams})
        case "environments":
            const environmentParams = `?page=${search.activePage}&pr_page=10&environment=${search.searchString}&${buildFilterString(search.filters, filterList[type])}`
            return dispatch({type: ENVIRONMENTS_LIST_REQUEST, filterString: environmentParams})
        case "applications":
            const applicationParams = `?page=${search.activePage}&pr_page=10&name=${search.searchString}&${buildFilterString(search.filters, filterList[type])}`
            return dispatch({type: APPLICATIONS_LIST_REQUEST, filterString: applicationParams})
        case "instances":
            const instanceParams = `?page=${search.activePage}&pr_page=10&application=${search.searchString}&${buildFilterString(search.filters, filterList[type])}`
            return dispatch({type: INSTANCES_LIST_REQUEST, filterString: instanceParams})
    }
}

export const changePage = (page, lastPage) => (dispatch) => {
    if (page < 0) page = 0
    if (page > lastPage) page = lastPage
    dispatch({type: CHANGE_PAGE, value: page} )
}
export const buildFilterString = (filters, filterList) => {
    let filterString = ''
    for (let filter in filters) {
        if (filterList.indexOf(filter) !== -1) {
            if (filters[filter])
                filterString += filter + "=" + filters[filter] + "&"
        }
    }
    return filterString
}