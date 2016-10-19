import { takeEvery, delay} from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'
import { fetchUrl, putUrl } from '../utils'
import {
    CLOSE_SUBMIT_EDIT_NODE_FORM_STATUS,
    RECEIVED_EDIT_NODE_FORM_DATA,
    REQUEST_EDIT_NODE_FORM_DATA,
    REQUEST_EDIT_NODE_FORM_DATA_FAILED,
    SET_EDIT_NODE_FORM_VALUES,
    SHOW_SUBMIT_EDIT_NODE_FORM,
    SHOW_EDIT_NODE_FORM,
    SUBMIT_EDIT_NODE_FORM,
    SUBMIT_EDIT_NODE_FORM_FAILED,
    SUBMIT_EDIT_NODE_FORM_SUCCESS,
    SUBMITTING_EDIT_NODE_FORM,
} from '../actionTypes'

// Selectore som henter data fra store

export function* fetchFasit() {
    yield put({type: REQUEST_EDIT_NODE_FORM_DATA})
    const fasitData = yield select((state) => state.node_fasit.data)

    let password = ""
    try {
        password = yield fetchUrl(`${fasitData.password.ref}`)
    } catch( err ) {
        const value = err.message
        yield put({type: REQUEST_EDIT_NODE_FORM_DATA_FAILED, value})
    }
    const value = {
        hostname: fasitData.hostname,
        type: fasitData.type,
        username: fasitData.username,
        password,
    }
    yield put({type: RECEIVED_EDIT_NODE_FORM_DATA, value})
}

export function* submitEditNodeForm(action) {
    yield put({type: SUBMITTING_EDIT_NODE_FORM})
    yield put({type: SHOW_SUBMIT_EDIT_NODE_FORM, value: false })
    try {
        yield putUrl(action.url, action.value)
        yield put({type: SUBMIT_EDIT_NODE_FORM_SUCCESS })
        yield call(delay, 1000)
        yield put({type: CLOSE_SUBMIT_EDIT_NODE_FORM_STATUS})
        yield put({type: SHOW_EDIT_NODE_FORM, value: false})
    } catch(err) {
        const value = err.message
        yield put({type: SUBMIT_EDIT_NODE_FORM_FAILED, value})
    }

}

export function* watchNodeEdit() {
    yield fork(takeEvery, SET_EDIT_NODE_FORM_VALUES, fetchFasit)
    yield fork(takeEvery, SUBMIT_EDIT_NODE_FORM, submitEditNodeForm)
}