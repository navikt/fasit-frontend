import { takeEvery, delay} from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'
import { deleteUrl } from '../utils'
import {
    CLOSE_SUBMIT_DELETE_NODE_STATUS,
    SHOW_DELETE_NODE_FORM,
    SUBMIT_DELETE_NODE,
    SUBMIT_DELETE_NODE_SUCCESS,
    SUBMIT_DELETE_NODE_FAILED,
    SUBMITTING_DELETE_NODE,
} from '../actionTypes'

export function* submitDeleteNode(action) {
    const configuration = yield select((state) => state.configuration)
    const url = `${configuration.fasit_nodes}/${action.hostname}`
    yield put({type: SHOW_DELETE_NODE_FORM, value: false})
    yield put({type: SUBMITTING_DELETE_NODE})
    try {
        yield deleteUrl(url)
        yield put({type: SUBMIT_DELETE_NODE_SUCCESS })
        yield call(delay, 1000)
        yield put({type: CLOSE_SUBMIT_DELETE_NODE_STATUS})
    } catch(err) {
        const value = err.message
        yield put({type: SUBMIT_DELETE_NODE_FAILED, value})
    }

}

export function* watchNodeDelete() {
    yield fork(takeEvery, SUBMIT_DELETE_NODE, submitDeleteNode)
}