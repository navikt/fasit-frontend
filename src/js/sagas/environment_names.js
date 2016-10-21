import {takeEvery} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    ENVIRONMENT_NAMES_REQUEST,
    ENVIRONMENT_NAMES_RECEIVED
} from '../actionTypes'

// Selectore som henter data fra store

export function* fetchEnvironmentNames(action) {
    const environments = yield select((state) => state.configuration.fasit_environments)
    const url = `${environments}${action.filterString}`
    try {
        const environmentNames = yield fetchUrl(url)
        const value = environmentNames.map(env => env.name)
        yield put({type: ENVIRONMENT_NAMES_RECEIVED, value})
    } catch (err) {
        console.log("Unable to fetch environment names: ", err.message)
    }
}


export function* watchEnvironmentNames() {
    yield fork(takeEvery, ENVIRONMENT_NAMES_REQUEST, fetchEnvironmentNames)
}