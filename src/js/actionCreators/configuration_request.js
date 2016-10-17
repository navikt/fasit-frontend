import {
    CONFIGURATION_REQUEST,
} from '../actionTypes'

export const configurationRequest = () => (dispatch) =>  dispatch({type: CONFIGURATION_REQUEST, url:`/config`})