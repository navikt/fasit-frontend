import {takeEvery} from 'redux-saga'
import {select, put, fork, call} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    RESOURCE_FASIT_REQUEST,
    RESOURCE_FASIT_FETCHING,
    RESOURCE_FASIT_SECRET_REQUEST,
    RESOURCE_FASIT_RECEIVED,
    RESOURCE_FASIT_SECRET_RECEIVED,
    RESOURCE_FASIT_REQUEST_FAILED
} from '../actionTypes'

export function* fetchFasit(action) {
    const resourcesConfig = yield select((state) => state.configuration.fasit_resources)
    yield put({type: RESOURCE_FASIT_FETCHING})
    try {
        let value = {}

        if (action.revision){
            value = yield call(fetchUrl, `${resourcesConfig}/${action.id}/revisions/${action.revision}`)
        } else {
            value = yield call(fetchUrl, `${resourcesConfig}/${action.id}`)
        }
        yield put({type: RESOURCE_FASIT_RECEIVED, value})
    } catch (error) {
        console.log("error", error)
        yield put({type: RESOURCE_FASIT_REQUEST_FAILED, error})

    }
}


export function* fetchFasitResourceSecret() {
    const secrets = yield  select((state) => state.resource_fasit.data.secrets)
    const key = Object.keys(secrets)[0]
    const value = yield call(fetchUrl, secrets[key].ref)
    yield put({type: RESOURCE_FASIT_SECRET_RECEIVED, value: value})

    // TODO Husk error handling

}

export function* watchResourceFasit() {
    yield fork(takeEvery, RESOURCE_FASIT_REQUEST, fetchFasit)
    yield fork(takeEvery, RESOURCE_FASIT_SECRET_REQUEST, fetchFasitResourceSecret)
}
