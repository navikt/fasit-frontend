import {takeLatest} from "redux-saga";
import {fork, put, select} from "redux-saga/effects";
import {browserHistory} from 'react-router'
import {fetchPage} from "../utils";
import {
    APPLICATIONS_LIST_FAILED,
    APPLICATIONS_LIST_RECEIVED,
    ENVIRONMENTS_LIST_FAILED,
    ENVIRONMENTS_LIST_RECEIVED,
    INSTANCES_LIST_FAILED,
    INSTANCES_LIST_RECEIVED,
    NODES_LIST_FAILED,
    NODES_LIST_RECEIVED,
    RESOURCES_LIST_FAILED,
    RESOURCES_LIST_RECEIVED,
    SUBMIT_FILTER_SEARCH
} from "../actionTypes";

function* fetchEnvironmentsList(url) {
    try {
        const page = yield fetchPage(url)
        yield put({ type: ENVIRONMENTS_LIST_RECEIVED, page })
    } catch (err) {
        const value = err.message
        yield put({ type: ENVIRONMENTS_LIST_FAILED, value })
    }
}

function* fetchInstancesList(url) {
    try {
        const page = yield fetchPage(url)
        yield put({ type: INSTANCES_LIST_RECEIVED, page })
    } catch (err) {
        console.error("Fetch instances failed", err)
        const value = err.message

        yield put({ type: INSTANCES_LIST_FAILED, value })
    }
}


function* fetchResourcesList(url) {
    try {
        const page = yield fetchPage(url)
        yield put({ type: RESOURCES_LIST_RECEIVED, page })
    } catch (err) {
        const value = err.message
        yield put({ type: RESOURCES_LIST_FAILED, value })
    }
}

function* fetchApplicationsList(url) {
    try {
        const page = yield fetchPage(url)
        yield put({ type: APPLICATIONS_LIST_RECEIVED, page })
    } catch (err) {
        const value = err.message
        yield put({ type: APPLICATIONS_LIST_FAILED, value })
    }
}


function* fetchNodesList(url) {
    try {
        const page = yield fetchPage(url)
        yield put({ type: NODES_LIST_RECEIVED, page })
    } catch (err) {
        const value = err.message
        console.error("Error fetching nodes list", err)
        yield put({ type: NODES_LIST_FAILED, value })
    }
}

export function* fetchAllLists(action) {
    const filterConfig = {
        nodes: { filters: ["environment", "environmentclass", "type"] },
        resources: { filters: ["environment", "environmentclass", "zone", "application", "resourcetype", "alias"] },
        environments: { filters: ['environmentclass'] },
        applications: { filters: ['application'] },
        instances: { filters: ["environment", "environmentclass", "application"] }
    }

    const configuration = yield select((state) => state.configuration)
    const filter = yield select((state) => state.filter)

    console.log("calling fetch all list 69", action.location)

    let filterString = ""

    switch (action.location) {
        case "nodes":
            filterString = buildFilterString(filter.filters, filterConfig.nodes)
            yield fetchNodesList(`${configuration.fasit_nodes}?page=${action.page}&pr_page=${action.prPage}&${filterString}`)
            setFilterAsQueryParams("nodes", filterString)
            return
        case "resources":
            filterString = buildFilterString(filter.filters, filterConfig.resources)
            yield fetchResourcesList(`${configuration.fasit_resources}?page=${action.page}&pr_page=${action.prPage}&${filterString}`)
            setFilterAsQueryParams("resources", filterString)
            break
        case "environments":
            filterString = buildFilterString(filter.filters, filterConfig.environments)
            yield fetchEnvironmentsList(`${configuration.fasit_environments}?pr_page=1000&${filterString}`)
            setFilterAsQueryParams("environments", filterString)
            break
        case "applications":
            yield fetchApplicationsList(`${configuration.fasit_applications}?pr_page=1000&${filterString}`)
            break
        case "instances":
            filterString = buildFilterString(filter.filters, filterConfig.instances)
            yield fetchInstancesList(`${configuration.fasit_applicationinstances}?page=${action.page}&pr_page=${action.prPage}&${filterString}`)
            setFilterAsQueryParams("instances", filterString)
            break
    }
}

function setFilterAsQueryParams(path, filterString) {
    if (filterString !== '') {
        browserHistory.push(`/${path}?${filterString}`)
    }
    else {
        browserHistory.push(`/${path}`)
    }
}


const buildFilterString = (filters) => {
    const filterString = Object.keys(filters)
        .reduce((accumulator, current) => {
            if (filters[current]) {
                const queryParam = (current === 'resourcetype') ? "type" : current // this is because there are multiple type properties in filters type name is taken by node
                accumulator.push(`${queryParam}=${filters[current]}`)
            }

            return accumulator
        }, []).join("&")

    return `${filterString}`
}
export function* watchElementsList() {
    yield fork(takeLatest, SUBMIT_FILTER_SEARCH, fetchAllLists)
}