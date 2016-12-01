import {
    RESOURCE_FASIT_REQUEST
} from '../actionTypes'

export const fetchFasitData = (id) => (dispatch) => dispatch({type: RESOURCE_FASIT_REQUEST, id})