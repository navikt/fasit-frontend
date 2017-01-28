import { takeEvery, delay} from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'
import { putUrl } from '../utils'
import {
    SUBMIT_FORM,
    SUBMITTING_FORM,
    SUBMIT_FORM_SUCCESS,
    SUBMIT_FORM_FAILED,
    CLOSE_SUBMIT_FORM_STATUS

} from '../actionTypes'


export function* submitForm(action) {
    const configuration = yield select((state) => state.configuration)
    console.log("action in submitForm", action)

    let url = ""
    switch (action.component){
        case "node":
            url = `${configuration.fasit_nodes}/${action.key}`
            break
        case "application":
            url = `${configuration.fasit_applications}/${action.key}`
            break


    }

    yield put({type: SUBMITTING_FORM})
    try {
        yield putUrl(url, action.value, action.comment)
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