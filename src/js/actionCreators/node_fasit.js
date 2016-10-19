import {
    CLEAR_NODE_PASSWORD,
    NODE_FASIT_REQUEST,
    NODE_FASIT_PASSWORD_REQUEST,
    SHOW_NODE_PASSWORD,
} from '../actionTypes'

export const fetchFasitData = (hostname) => (dispatch) => dispatch({type: NODE_FASIT_REQUEST, hostname})
export const fetchNodePassword = () => (dispatch) => dispatch({type: NODE_FASIT_PASSWORD_REQUEST})
export const clearNodePassword = () => (dispatch) => dispatch({type: CLEAR_NODE_PASSWORD})
export const showPassword = (value) => (dispatch) => dispatch({type: SHOW_NODE_PASSWORD, value})