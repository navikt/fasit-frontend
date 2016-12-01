import {takeLatest} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchPage} from '../utils'
import {
    FETCH_ELEMENT_LISTS,
    SET_SEARCH_STRING,
    APPLICATIONS_LIST_RECEIVED,
    APPLICATIONS_LIST_FAILED,
    ENVIRONMENTS_LIST_RECEIVED,
    ENVIRONMENTS_LIST_FAILED,
    INSTANCES_LIST_RECEIVED,
    INSTANCES_LIST_FAILED,
    NODES_LIST_RECEIVED,
    NODES_LIST_FAILED,
    RESOURCES_LIST_RECEIVED,
    RESOURCES_LIST_FAILED,
} from '../actionTypes'

function* fetchEnvironmentsList(url) {
    try {
        const page = yield fetchPage(url)
        yield put({type: ENVIRONMENTS_LIST_RECEIVED, page})
    } catch (err) {
        const value = err.message
        yield put({type: ENVIRONMENTS_LIST_FAILED, value})
    }
}

function* fetchInstancesList(url) {
    try {
        const page = yield fetchPage(url)
        yield put({type: INSTANCES_LIST_RECEIVED, page})
    } catch (err) {
        const value = err.message
        yield put({type: INSTANCES_LIST_FAILED, value})
    }
}


function* fetchResourcesList(url) {
    try {
        const page = yield fetchPage(url)
        yield put({type: RESOURCES_LIST_RECEIVED, page})
    } catch (err) {
        const value = err.message
        yield put({type: RESOURCES_LIST_FAILED, value})
    }
}

function* fetchApplicationsList(url) {
    try {
        const page = yield fetchPage(url)
        yield put({type: APPLICATIONS_LIST_RECEIVED, page})
    } catch (err) {
        const value = err.message
        yield put({type: APPLICATIONS_LIST_FAILED, value})
    }
}


function* fetchNodesList(url) {
    try {
        const page = yield fetchPage(url)
        yield put({type: NODES_LIST_RECEIVED, page})
    } catch (err) {
        const value = err.message
        yield put({type: NODES_LIST_FAILED, value})
    }
}

export function* fetchAllLists(action) {
    const filterConfig = {
        nodes: {key: "hostname", filters: ["environment", "environmentclass", "type"]},
        resources: {key: "alias", filters: ["environment", "environmentclass", "zone", "application"]},
        environments: {key: "name", filters: ['environmentclass']},
        applications: {key: "name", filters: ['application']},
        instances: {key: "application", filters: ["environment", "environmentclass", "application"]}
    }

    const configuration = yield select((state) => state.configuration)
    const search = yield select((state) => state.search)

    yield put({type: SET_SEARCH_STRING, searchString: action.searchString})

    switch (action.location) {
        case "nodes":
            yield fetchNodesList(`${configuration.fasit_nodes}?page=${action.page}&pr_page=${action.prPage}&${buildFilterString(search.filters, filterConfig.nodes, action.searchString)}`)
            return
        case "resources":
            yield fetchResourcesList(`${configuration.fasit_resources}?page=${action.page}&pr_page=${action.prPage}&${buildFilterString(search.filters, filterConfig.resources, action.searchString)}`)
            return
        case "environments":
            yield fetchEnvironmentsList(`${configuration.fasit_environments}?page=${action.page}&pr_page=${action.prPage}&${buildFilterString(search.filters, filterConfig.environments, action.searchString)}`)
            return
        case "applications":
            yield fetchApplicationsList(`${configuration.fasit_applications}?page=${action.page}&pr_page=${action.prPage}&${buildFilterString(search.filters, filterConfig.applications, action.searchString)}`)
            return
        case "instances":
            yield fetchInstancesList(`${configuration.fasit_applicationinstances}?page=${action.page}&pr_page=${action.prPage}&${buildFilterString(search.filters, filterConfig.instances, action.searchString)}`)
            return
        default:
            yield fetchNodesList(`${configuration.fasit_nodes}?page=${action.page}&pr_page=${action.prPage}&${buildFilterString(search.filters, filterConfig.nodes, action.searchString)}`)
            yield fetchResourcesList(`${configuration.fasit_resources}?page=${action.page}&pr_page=${action.prPage}&${buildFilterString(search.filters, filterConfig.resources, action.searchString)}`)
            yield fetchEnvironmentsList(`${configuration.fasit_environments}?page=${action.page}&pr_page=${action.prPage}&${buildFilterString(search.filters, filterConfig.environments, action.searchString)}`)
            yield fetchApplicationsList(`${configuration.fasit_applications}?page=${action.page}&pr_page=${action.prPage}&${buildFilterString(search.filters, filterConfig.applications, action.searchString)}`)
            yield fetchInstancesList(`${configuration.fasit_applicationinstances}?page=${action.page}&pr_page=${action.prPage}&${buildFilterString(search.filters, filterConfig.instances, action.searchString)}`)

            return

    }
}
const buildFilterString = (filters, filterConfig, searchString) => {
    let filterString = '&'
    for (let filter in filters) {
        if (filterConfig.filters.indexOf(filter) !== -1) {
            if (filters[filter])
                filterString += filter + "=" + filters[filter] + "&"
        }
    }
    return filterConfig.key + "=" + searchString + filterString
}
export function* watchElementsList() {
    yield fork(takeLatest, FETCH_ELEMENT_LISTS, fetchAllLists)
}