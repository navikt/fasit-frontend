import { call, put, select , takeEvery} from "redux-saga/effects"
import { push } from "connected-react-router"
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
    yield put(push(
      `/environments/${value.environment}/clusters/${value.clustername}`
    ))
    yield put({ type: ENVIRONMENT_CLUSTER_FASIT_RECEIVED, value })
  } catch (error) {
    yield put({ type: ENVIRONMENT_CLUSTER_FASIT_REQUEST_FAILED, error })
  }
}

export function* watchClusterFasit() {
  yield takeEvery(CLUSTER_FASIT_REQUEST, fetchFasitCluster)
}
