import {takeEvery} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchPage} from '../utils'
import {
    APPLICATIONS_LIST_RECEIVED,
    APPLICATIONS_LIST_REQUEST,
    APPLICATIONS_LIST_FAILED,
    ENVIRONMENTS_LIST_RECEIVED,
    ENVIRONMENTS_LIST_REQUEST,
    ENVIRONMENTS_LIST_FAILED,
    INSTANCES_LIST_RECEIVED,
    INSTANCES_LIST_REQUEST,
    INSTANCES_LIST_FAILED,
    NODES_LIST_REQUEST,
    NODES_LIST_RECEIVED,
    NODES_LIST_FAILED,
    RESOURCES_LIST_REQUEST,
    RESOURCES_LIST_RECEIVED,
    RESOURCES_LIST_FAILED,
} from '../actionTypes'

export function* fetchEnvironmentsList(action) {
    const environments = yield select((state) => state.configuration.fasit_environments)
    const url = `${environments}${action.filterString}`

    try {
        const page = yield fetchPage(url)
        yield put({type: ENVIRONMENTS_LIST_RECEIVED, page})
    } catch (err) {
        const value = err.message
        yield put({type: ENVIRONMENTS_LIST_FAILED, value})
    }
}

export function* fetchInstancesList(action) {
    const instances = yield select((state) => state.configuration.fasit_applicationinstances)
    const url = `${instances}${action.filterString}`

    try {
        const page = yield fetchPage(url)
        yield put({type: INSTANCES_LIST_RECEIVED, page})
    } catch (err) {
        const value = err.message
        yield put({type: INSTANCES_LIST_FAILED, value})
    }
}

export function* fetchNodesList(action) {
    const nodes = yield select((state) => state.configuration.fasit_nodes)
    const url = `${nodes}${action.filterString}`

    try {
        const page = yield fetchPage(url)
        yield put({type: NODES_LIST_RECEIVED, page})
    } catch (err) {
        const value = err.message
        yield put({type: NODES_LIST_FAILED, value})
    }
}

export function* fetchResourcesList(action) {
    const resources = yield select((state) => state.configuration.fasit_resources)
    const url = `${resources}${action.filterString}`

    try {
        const page = yield fetchPage(url)
        yield put({type: RESOURCES_LIST_RECEIVED, page})
    } catch (err) {
        const value = err.message
        yield put({type: RESOURCES_LIST_FAILED, value})
    }
}

export function* fetchApplicationsList(action) {
    const applications = yield select((state) => state.configuration.fasit_applications)
    const url = `${applications}${action.filterString}`

    try {
        const page = yield fetchPage(url)
        yield put({type: APPLICATIONS_LIST_RECEIVED, page})
    } catch (err) {
        const value = err.message
        yield put({type: APPLICATIONS_LIST_FAILED, value})
    }
}
export function* watchElementsList() {
    yield fork(takeEvery, NODES_LIST_REQUEST, fetchNodesList)
    yield fork(takeEvery, RESOURCES_LIST_REQUEST, fetchResourcesList)
    yield fork(takeEvery, INSTANCES_LIST_REQUEST, fetchInstancesList)
    yield fork(takeEvery, APPLICATIONS_LIST_REQUEST, fetchApplicationsList)
    yield fork(takeEvery, ENVIRONMENTS_LIST_REQUEST, fetchEnvironmentsList)
}