import { takeEvery, delay} from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'
import { putUrl, postUrl, deleteUrl } from '../utils'
import {
    SHOW_NEW_NODE_FORM,
    SUBMIT_FORM,
    SUBMITTING_FORM,
    SUBMIT_FORM_SUCCESS,
    SUBMIT_FORM_FAILED,
    CLOSE_SUBMIT_FORM_STATUS

} from '../actionTypes'

export function* submitForm(action) {
    const configuration = yield select((state) => state.configuration)
    let url = ""
    yield put({type: SUBMITTING_FORM})
    try {
        switch (action.component){
            case "node":
                url = `${configuration.fasit_nodes}/${action.key}`
                yield putUrl(url, action.value, action.comment)
                break
            case "newNode":
                url = `${configuration.fasit_nodes}/${action.key}`
                yield postUrl(url, action.value, action.comment)
                break
            case "deleteNode":
                url = `${configuration.fasit_nodes}/${action.key}`
                yield deleteUrl(url, action.value, action.comment)
                break
            case "application":
                url = `${configuration.fasit_applications}/${action.key}`
                yield putUrl(url, action.value, action.comment)
                break

        }
        yield put({type: SHOW_NEW_NODE_FORM, value: false})
        yield put({type: SUBMIT_FORM_SUCCESS })
        yield call(delay, 2000)
        yield put({type: CLOSE_SUBMIT_FORM_STATUS})
    } catch(err) {
        const value = err.message
        yield put({type: SUBMIT_FORM_FAILED, value})
    }

}

export function* watchSubmitForm() {
    yield fork(takeEvery, SUBMIT_FORM, submitForm)
}