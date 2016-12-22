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
        const payload = yield fetchUrl(url + "?pr_page=500")
        const applicationNames = payload
            .map(app => app.name)
            .sort(sortLowerCase)
        yield put({type: APPLICATION_NAMES_RECEIVED, applicationNames})
    } catch (err) {
        console.log("Unable to fetch application names: ", err.message)
    }
}

const sortLowerCase = (first, second) => {
    if (first.toLowerCase() < second.toLowerCase()) return -1
    if (first.toLowerCase() > second.toLowerCase()) return 1
    return 0
}

export function* watchApplicationNames() {
    yield fork(takeEvery, APPLICATION_NAMES_REQUEST, fetchApplicationNames)
}