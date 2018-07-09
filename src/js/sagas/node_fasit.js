import { takeEvery } from "redux-saga"
import { select, put, fork, call } from "redux-saga/effects"
import { browserHistory } from "react-router"
import { fetchUrl, isEmptyObject, validAuthorization } from "../utils"
import {
  LOGIN_SUCCESS,
  NODE_FASIT_REQUEST,
  NODE_FASIT_URL_REQUEST,
  NODE_FASIT_FETCHING,
  NODE_FASIT_RECEIVED,
  NODE_FASIT_REQUEST_FAILED,
  NODE_FASIT_PASSWORD_RECEIVED,
  NODE_FASIT_PASSWORD_REQUEST,
  NODE_FASIT_PASSWORD_REQUEST_FAILED,
  RESCUE_NODE,
  DEPLOYMENTMANAGER_FASIT_REQUEST,
  DEPLOYMENTMANAGER_REQUEST_FAILED,
  DEPLOYMENTMANAGER_RECEIVED
} from "../actionTypes"

export function* fetchFasitPassword() {
  const node = yield select(state => state.node_fasit)
  const user = yield select(state => state.user)

  if (
    !isEmptyObject(node) &&
    validAuthorization(user, node.data.accesscontrol)
  ) {
    const secret = yield select(state => state.node_fasit.data.password.ref)
    try {
      const value = yield fetchUrl(secret)
      yield put({ type: NODE_FASIT_PASSWORD_RECEIVED, value })
    } catch (err) {
      const value = err.message
      yield put({ type: NODE_FASIT_PASSWORD_REQUEST_FAILED, value })
    }
  }
}

export function* fetchFasitUrl(action) {
  yield put({ type: NODE_FASIT_FETCHING })
  try {
    const value = yield call(fetchUrl, action.url)
    yield browserHistory.push(`/nodes/${value.hostname}`)
    yield put({ type: NODE_FASIT_RECEIVED, value })
    yield put({ type: NODE_FASIT_PASSWORD_REQUEST })
    yield put({ type: DEPLOYMENTMANAGER_FASIT_REQUEST })
  } catch (error) {
    yield put({ type: NODE_FASIT_REQUEST_FAILED, error })
  }
}

export function* fetchFasit(action) {
  const nodes = yield select(state => state.configuration.fasit_nodes)
  let value = {}
  yield put({ type: NODE_FASIT_FETCHING })
  try {
    if (action.revision) {
      value = yield call(
        fetchUrl,
        `${nodes}/${action.hostname}/revisions/${action.revision}`
      )
    } else {
      value = yield call(fetchUrl, `${nodes}/${action.hostname}`)
    }
    yield put({ type: NODE_FASIT_RECEIVED, value })
    yield put({ type: NODE_FASIT_PASSWORD_REQUEST })
    yield put({ type: DEPLOYMENTMANAGER_FASIT_REQUEST })
  } catch (error) {
    console.log("Error fetching node", error)
    yield put({ type: NODE_FASIT_REQUEST_FAILED, error })
  }
}

export function* fetchDeploymentManager() {
  const node = yield select(state => state.node_fasit.data)

  if (
    !isEmptyObject(node) &&
    (node.type.startsWith("was") || node.type.startsWith("bpm"))
  ) {
    const resourceApi = yield select(
      state => state.configuration.fasit_resources
    )
    const alias = `${node.type}Dmgr`

    try {
      const value = yield call(
        fetchUrl,
        `${resourceApi}?alias=${alias}&zone=${node.zone}&environment=${
          node.environment
        }&type=deploymentmanager`
      )
      yield put({ type: DEPLOYMENTMANAGER_RECEIVED, value: value[0] })
    } catch (error) {
      yield put({ type: DEPLOYMENTMANAGER_REQUEST_FAILED, error })
    }
  }
}

export function* rescueNode(action) {
  console.log("I'm in the 'node_fasit'-saga with this action: ", action)
}

export function* watchNodeFasit() {
  yield fork(takeEvery, NODE_FASIT_URL_REQUEST, fetchFasitUrl)
  yield fork(takeEvery, NODE_FASIT_REQUEST, fetchFasit)
  yield fork(takeEvery, DEPLOYMENTMANAGER_FASIT_REQUEST, fetchDeploymentManager)
  yield fork(takeEvery, NODE_FASIT_PASSWORD_REQUEST, fetchFasitPassword)
  yield fork(takeEvery, LOGIN_SUCCESS, fetchFasitPassword)
  yield fork(takeEvery, RESCUE_NODE, rescueNode)
}
