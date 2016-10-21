import {takeEvery} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    RESOURCE_TYPES_REQUEST,
    RESOURCE_TYPES_RECEIVED
} from '../actionTypes'

// Selectore som henter data fra store

export function* fetchResourceTypes() {
    const resources = yield select((state) => state.configuration.fasit_resources)
    const url = `${resources}/types`

    try {
        const resourceTypes = yield fetchUrl(url)
        const value = yield resourceTypes.map(resourceType => resourceType.type)
        yield put({type: RESOURCE_TYPES_RECEIVED, value})
    } catch (err) {
        console.log("Unable to fetch resource types: ", err.message)
    }
}


export function* watchResourceTypes() {
    yield fork(takeEvery, RESOURCE_TYPES_REQUEST, fetchResourceTypes)
}