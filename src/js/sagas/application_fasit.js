import {takeEvery} from 'redux-saga'
import {select, put, fork, call} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    APPLICATION_FASIT_FETCHING,
    APPLICATION_FASIT_RECEIVED,
    APPLICATION_FASIT_REQUEST_FAILED,
    APPLICATION_FASIT_REQUEST,
    APPLICATION_INSTANCES_FETCHING,
    APPLICATION_INSTANCES_RECEIVED,
    APPLICATION_INSTANCES_REQUEST,
    APPLICATION_INSTANCES_REQUEST_FAILED
} from '../actionTypes'


export function* fetchFasit(action) {
    const applications_api = yield select((state) => state.configuration.fasit_applications)
    let value = {}
    yield put({type: APPLICATION_FASIT_FETCHING})
    try {
        if (action.revision){
            value = yield call(fetchUrl, `${applications_api}/${action.name}/revisions/${action.revision}`)
        } else {
            value = yield call(fetchUrl, `${applications_api}/${action.name}`)
        }
        yield put({type: APPLICATION_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: APPLICATION_FASIT_REQUEST_FAILED, error})

    }
}

export function* fetchApplicationInstances(action) {
    const instances_api = yield select((state) => state.configuration.fasit_applicationinstances)
    yield put({type: APPLICATION_INSTANCES_FETCHING})
    try {
        //const value = yield call(fetchUrl, `${instances_api}?application=${action.name}`)
        const value = yield call(fetchUrl, `${instances_api}?application=${action.name}`)
        yield put({type: APPLICATION_INSTANCES_RECEIVED, value})
    } catch (error) {
        yield put({type: APPLICATION_INSTANCES_REQUEST_FAILED, error})
    }
}

export function* watchApplicationFasit() {
    yield fork(takeEvery, APPLICATION_FASIT_REQUEST, fetchFasit)
    yield fork(takeEvery, APPLICATION_INSTANCES_REQUEST, fetchApplicationInstances)
}