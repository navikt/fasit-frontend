import {takeEvery} from "redux-saga";
import {select, put, fork, call} from "redux-saga/effects";
import {fetchUrl} from "../utils";
import {
    RESOURCE_FASIT_REQUEST,
    RESOURCE_FASIT_FETCHING,
    RESOURCE_FASIT_SECRET_REQUEST,
    RESOURCE_FASIT_RECEIVED,
    RESOURCE_FASIT_SECRET_RECEIVED,
    RESOURCE_FASIT_REQUEST_FAILED
} from "../actionTypes";

export function* fetchFasit(action) {
    const resourcesConfig = yield select((state) => state.configuration.fasit_resources)
    yield put({type: RESOURCE_FASIT_FETCHING})
    try {
        let value = {}
        if (action.revision) {
            value = yield call(fetchUrl, `${resourcesConfig}/${action.id}/revisions/${action.revision}`)
        } else {
            value = yield call(fetchUrl, `${resourcesConfig}/${action.id}`)
        }
        yield put({type: RESOURCE_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: RESOURCE_FASIT_REQUEST_FAILED, error})

    }
}


export function* fetchFasitResourceSecret() {
    try {
        const secretRefs = yield  select((state) => state.resource_fasit.data.secrets)
        const keys = Object.keys(secretRefs)

        let secrets = {}
        for(let i = 0; i < keys.length; i++) {
            let key = keys[i]
            const secret = yield call(fetchUrl, secretRefs[key].ref)
            secrets[key] = secret
            yield put({type: RESOURCE_FASIT_SECRET_RECEIVED, secrets})
        }
    }
    catch(error) {
            console.log("Error getting secret", error)
        }
    }

    export function* watchResourceFasit() {
        yield fork(takeEvery, RESOURCE_FASIT_REQUEST, fetchFasit)
        yield fork(takeEvery, RESOURCE_FASIT_SECRET_REQUEST, fetchFasitResourceSecret)
    }
