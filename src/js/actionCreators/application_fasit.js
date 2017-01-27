import {
    APPLICATION_FASIT_REQUEST
} from '../actionTypes'

export const fetchFasitData = (name) => (dispatch) => dispatch({type: APPLICATION_FASIT_REQUEST, name})