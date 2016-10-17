import {expect} from 'chai'
import { SET_ACTIVE_APPLICATION } from '../../main/frontend/js/actionTypes'
import reducer from '../../main/frontend/js/reducers/applications'

describe('Applications reducer', () => {
    it('Should handle SET_ACTIVE_APPLICATION', () => {
        const initialState = 0
        const newState = reducer(initialState, {type: 'SET_ACTIVE_APPLICATION', value: 1})
        expect(newState).to.eql({active: 1})
    })
})
