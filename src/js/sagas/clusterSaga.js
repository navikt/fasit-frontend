import { takeEvery } from "redux-saga"
import { call, fork, put, select } from "redux-saga/effects"
import { browserHistory } from "react-router"
import { fetchUrl } from "../utils"
import {
  ENVIRONMENT_CLUSTER_FASIT_RECEIVED,
  CLUSTER_FASIT_REQUEST,
  ENVIRONMENT_CLUSTER_FASIT_REQUEST_FAILED
} from "../actionTypes"

export function* fetchFasitCluster(action) {
  const clusterApi = yield select(state => state.configuration.fasit_clusters)
  yield put({ type: ENVIRONMENT_CLUSTER_FASIT_FETCHING })
  try {
    const value = yield call(fetchUrl, `${clusterApi}/${action.key}`)
    yield browserHistory.push(
      `/environments/${value.environment}/clusters/${value.clustername}`
    )
    yield put({ type: ENVIRONMENT_CLUSTER_FASIT_RECEIVED, value })
  } catch (error) {
    yield put({ type: ENVIRONMENT_CLUSTER_FASIT_REQUEST_FAILED, error })
  }
}

export function* watchClusterFasit() {
  yield fork(takeEvery, CLUSTER_FASIT_REQUEST, fetchFasitCluster)
}
