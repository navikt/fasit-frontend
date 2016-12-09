import {takeEvery} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    ENVIRONMENTS_REQUEST,
    ENVIRONMENTS_RECEIVED
} from '../actionTypes'

export function* fetchEnvironments() {
    const url = yield select((state) => state.configuration.fasit_environments)

    try {
        const environmentNames = yield fetchUrl(url)
        const value = environmentNames.map(env => {
            return {name: env.name, environmentclass: env.environmentclass}
        })
        yield put({type: ENVIRONMENTS_RECEIVED, value})
    } catch (err) {
        console.log("Unable to fetch environments: ", err.message)
    }
}

export function* watchEnvironments() {
    yield fork(takeEvery, ENVIRONMENTS_REQUEST, fetchEnvironments)
}