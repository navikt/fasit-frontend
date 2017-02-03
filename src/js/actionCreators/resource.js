import {
    RESOURCE_FASIT_REQUEST,
    RESOURCE_FASIT_PASSWORD_REQUEST
} from '../actionTypes'

export const fetchFasitData = (id) => {return {type: RESOURCE_FASIT_REQUEST, id}}
export const fetchResourcePassword = () => {return {type: RESOURCE_FASIT_PASSWORD_REQUEST}}