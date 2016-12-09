import {takeEvery} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    APPLICATION_NAMES_REQUEST,
    APPLICATION_NAMES_RECEIVED
} from '../actionTypes'

export function* fetchApplicationNames() {
    const url = yield select((state) => state.configuration.fasit_applications)

    try {
        const payload = yield fetchUrl(url)
        const applicationNames = payload.map(app => app.name)
        yield put({type: APPLICATION_NAMES_RECEIVED, applicationNames})
    } catch (err) {
        console.log("Unable to fetch application names: ", err.message)
    }
}

export function* watchApplicationNames() {
    yield fork(takeEvery, APPLICATION_NAMES_REQUEST, fetchApplicationNames)
}