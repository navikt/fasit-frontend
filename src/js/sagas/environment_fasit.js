import {takeEvery} from 'redux-saga'
import {select, put, fork, call} from 'redux-saga/effects'
import {browserHistory} from "react-router";
import {fetchUrl} from '../utils'
import {
    ENVIRONMENT_FASIT_REQUEST,
    ENVIRONMENT_FASIT_FETCHING,
    ENVIRONMENT_FASIT_RECEIVED,
    ENVIRONMENT_FASIT_URL_REQUEST,
    ENVIRONMENT_FASIT_REQUEST_FAILED,
    ENVIRONMENT_CLUSTERS_REQUEST,
    CLUSTER_FASIT_URL_REQUEST,
    ENVIRONMENT_CLUSTERS_FETCHING,
    ENVIRONMENT_CLUSTERS_RECEIVED,
    ENVIRONMENT_CLUSTERS_REQUEST_FAILED,
    ENVIRONMENT_CLUSTER_FASIT_REQUEST,
    ENVIRONMENT_CLUSTER_FASIT_FETCHING,
    ENVIRONMENT_CLUSTER_FASIT_RECEIVED,
    ENVIRONMENT_CLUSTER_FASIT_REQUEST_FAILED,
    ENVIRONMENT_NODES_FASIT_REQUEST,
    ENVIRONMENT_NODES_FASIT_FETCHING,
    ENVIRONMENT_NODES_FASIT_RECEIVED,
    ENVIRONMENT_NODES_FASIT_REQUEST_FAILED,
    ENVIRONMENT_INSTANCES_FASIT_REQUEST,
    ENVIRONMENT_INSTANCES_FASIT_FETCHING,
    ENVIRONMENT_INSTANCES_FASIT_RECEIVED,
    ENVIRONMENT_INSTANCES_FASIT_REQUEST_FAILED

} from '../actionTypes'

export function* fetchEnvironment(action) {
    const environmentsApi = yield select((state) => state.configuration.fasit_environments)
    let value = {}

    yield put({type: ENVIRONMENT_FASIT_FETCHING})
    try {
        if (action.revision) {
            value = yield call(fetchUrl, `${environmentsApi}/${action.id}/revisions/${action.revision}`)
        } else {
            value = yield call(fetchUrl, `${environmentsApi}/${action.id}`)
        }
        yield put({type: ENVIRONMENT_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: ENVIRONMENT_FASIT_REQUEST_FAILED, error})
    }
}

export function* fetchFasitEnvironmentUrl(action) {
    yield put({type: ENVIRONMENT_FASIT_FETCHING})
    try {
        const value = yield call(fetchUrl, action.url)
        yield browserHistory.push(`/environments/${value.name}`)
        yield put({type: ENVIRONMENT_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: ENVIRONMENT_FASIT_REQUEST_FAILED, error})
    }
}

export function* fetchFasitClusterUrl(action) {
    yield put({type: ENVIRONMENT_CLUSTER_FASIT_FETCHING})
    try {
        const value = yield call(fetchUrl, action.url)
        yield browserHistory.push(`/environments/${value.environment}/clusters/${value.clustername}`)
        yield put({type: ENVIRONMENT_CLUSTER_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: ENVIRONMENT_CLUSTER_FASIT_REQUEST_FAILED, error})
    }
}

export function* fetchEnvironmentClusters(action) {
    const environmentsApi = yield select((state) => state.configuration.fasit_environments)
    const environment = action.environment
    yield put({type: ENVIRONMENT_CLUSTERS_FETCHING})
    try {
        const value = yield call(fetchUrl, `${environmentsApi}/${environment}/clusters`)
        yield put({type: ENVIRONMENT_CLUSTERS_RECEIVED, value})
    } catch (error) {
        yield put({type: ENVIRONMENT_CLUSTERS_REQUEST_FAILED, error})
    }
}

export function* fetchEnvironmentCluster(action) {
    const environmentsApi = yield select((state) => state.configuration.fasit_environments)
    const {environment, cluster, revision} = action
    let value = {}

    yield put({type: ENVIRONMENT_CLUSTER_FASIT_FETCHING})
    try {
        if (action.revision) {
            value = yield call(fetchUrl, `${environmentsApi}/${environment}/clusters/${cluster}/revisions/${revision}`)
        } else {
            value = yield call(fetchUrl, `${environmentsApi}/${environment}/clusters/${cluster}`)
        }
        yield put({type: ENVIRONMENT_CLUSTER_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: ENVIRONMENT_CLUSTER_FASIT_REQUEST_FAILED, error})
    }
}

export function* fetchEnvironmentNodes(action) {
    const nodesApi = yield select((state) => state.configuration.fasit_nodes)
    yield put({type: ENVIRONMENT_NODES_FASIT_FETCHING})
    try {
        const value = yield call(fetchUrl, `${nodesApi}?environment=${action.environment}`);
        yield put({type: ENVIRONMENT_NODES_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: ENVIRONMENT_NODES_FASIT_REQUEST_FAILED, error})
    }
}

export function* fetchEnvironmentInstances(action) {
    const instancesApi = yield select((state) => state.configuration.fasit_applicationinstances)
    yield put({type: ENVIRONMENT_INSTANCES_FASIT_FETCHING})
    try {
        const value = yield call(fetchUrl, `${instancesApi}/environment/${action.environment}`)
        yield put({type: ENVIRONMENT_INSTANCES_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: ENVIRONMENT_INSTANCES_FASIT_REQUEST_FAILED, error})
    }
}

export function* watchEnvironmentFasit() {
    yield fork(takeEvery, CLUSTER_FASIT_URL_REQUEST, fetchFasitClusterUrl)
    yield fork(takeEvery, ENVIRONMENT_FASIT_URL_REQUEST, fetchFasitEnvironmentUrl)
    yield fork(takeEvery, ENVIRONMENT_FASIT_REQUEST, fetchEnvironment)
    yield fork(takeEvery, ENVIRONMENT_CLUSTER_FASIT_REQUEST, fetchEnvironmentCluster)
    yield fork(takeEvery, ENVIRONMENT_CLUSTERS_REQUEST, fetchEnvironmentClusters)
    yield fork(takeEvery, ENVIRONMENT_NODES_FASIT_REQUEST, fetchEnvironmentNodes)
    yield fork(takeEvery, ENVIRONMENT_INSTANCES_FASIT_REQUEST, fetchEnvironmentInstances)
}