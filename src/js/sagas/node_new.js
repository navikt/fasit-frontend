import { takeEvery, delay} from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import { postUrl } from '../utils'
import {
    CLOSE_SUBMIT_NEW_NODE_FORM_STATUS,
    SHOW_NEW_NODE_FORM,
    SUBMIT_NEW_NODE_FORM,
    SUBMIT_NEW_NODE_FORM_FAILED,
    SUBMIT_NEW_NODE_FORM_SUCCESS,
    SUBMITTING_NEW_NODE_FORM,

} from '../actionTypes'

export function* submitNewNodeForm(action) {
    yield put({type: SUBMITTING_NEW_NODE_FORM})
    yield put({type: SHOW_NEW_NODE_FORM, value: false})
    try {
        yield postUrl(action.url, action.value)
        yield put({type: SUBMIT_NEW_NODE_FORM_SUCCESS })
        yield call(delay, 1000)
        yield put({type: CLOSE_SUBMIT_NEW_NODE_FORM_STATUS})
    } catch(err) {
        const value = err.message
        yield put({type: SUBMIT_NEW_NODE_FORM_FAILED, value})
    }

}

export function* watchNodeNew() {
    yield fork(takeEvery, SUBMIT_NEW_NODE_FORM, submitNewNodeForm)
}