import 'babel-polyfill'
import {expect} from 'chai'
import {
    NODE_REVISIONS_FETCHING,
    NODE_REVISIONS_RECEIVED,
    NODE_REVISIONS_REQUEST_FAILED
} from '../../main/frontend/js/actionTypes'
import {put, call} from 'redux-saga/effects'
import {fetchRevisions, get} from '../../main/frontend/js/sagas/nodeRevisions'

describe('fetchRevisions Saga tests', () => {

    it('Should fetch revisions and post to store', () => {
        const iterator = fetchRevisions({value: "Mock-host"})
        const response = [{balls: "deep"}]
        expect(iterator.next().value).to.eql(put({type:NODE_REVISIONS_FETCHING}))
        expect(iterator.next().value).to.eql(call(get, "Mock-host"))
        expect(iterator.next(response).value).to.eql(put({type: NODE_REVISIONS_RECEIVED, value: response}))
    })
    it('Should post Error to store if fetch was unsuccessful', () => {
        const iterator = fetchRevisions({value: "Mock-host"})
        const error = new Error("bad shit")
        expect(iterator.next().value).to.eql(put({type:NODE_REVISIONS_FETCHING}))
        expect(iterator.next().value).to.eql(call(get, "Mock-host"))
        expect(iterator.throw(error).value).to.eql(put({type:NODE_REVISIONS_REQUEST_FAILED, error}))

    })

})

