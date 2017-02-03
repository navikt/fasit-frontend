import {takeEvery} from 'redux-saga'
import {select, put, fork, call} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    RESOURCE_FASIT_REQUEST,
    RESOURCE_FASIT_FETCHING,
    RESOURCE_FASIT_PASSWORD_REQUEST,
    RESOURCE_FASIT_RECEIVED,
    RESOURCE_FASIT_REQUEST_FAILED
} from '../actionTypes'

export function* fetchFasit(action) {
    const resourcesConfig = yield select((state) => state.configuration.fasit_resources)
    yield put({type: RESOURCE_FASIT_FETCHING})
    try {
        const value = yield call(fetchUrl, `${resourcesConfig}/${action.id}`)
        yield put({type: RESOURCE_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: RESOURCE_FASIT_REQUEST_FAILED, error})

    }
}

function* getSecret(ref) {
    try {
        console.log("calling ", ref)
        const val = yield call(fetchUrl, ref)
        console.log("val", val)
    }
    catch(error) {
        console.log("Fail, ", error)
    }

}

export function* fetchFasitResourceSecret() {
    console.log("heeeeffff")
    const secrets = yield  select((state) => state.resource_fasit.data.secrets)
    console.log("ggg", secrets)

    const bananer =  yield Object.keys(secrets).map(s => {
         try {
                        return  call(fetchUrl,  secrets[s].ref)

         } catch(error) {
             console.log("AA faen", error)
         }
             //console.log("sekret", s, secrets[s], secrets[s].ref)

           // try {
                //const pwd =  getSecret(secrets[s].ref)
                //console.log("Got the fucker", pwd)
            //} catch(error) {
              //  console.log("fail", error)
            //}


         })

    console.log("Bananer", bananer)
}

export function* watchResourceFasit() {
    yield fork(takeEvery, RESOURCE_FASIT_REQUEST, fetchFasit)
    yield fork(takeEvery, RESOURCE_FASIT_PASSWORD_REQUEST, fetchFasitResourceSecret)
}



/*
* export function* fetchFasitPassword() {
 const secret = yield select((state) => state.node_fasit.data.password.ref)
 try {
 const value = yield fetchUrl(secret)
 yield put({type: NODE_FASIT_PASSWORD_RECEIVED, value})
 } catch (err) {
 const value = err.message
 yield put({type: NODE_FASIT_PASSWORD_REQUEST_FAILED, value})
 }
 }
* */