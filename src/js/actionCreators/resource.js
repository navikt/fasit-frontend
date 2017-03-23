import {
    CLEAR_RESOURCE_SECRET,
    RESOURCE_FASIT_REQUEST,
    RESOURCE_FASIT_SECRET_REQUEST
} from '../actionTypes'

export const clearResourceSecret = () => {return {type: CLEAR_RESOURCE_SECRET}}
export const fetchFasitData = (id, revision) => {return {type: RESOURCE_FASIT_REQUEST, id, revision}}
export const fetchResourceSecret = () => {return {type: RESOURCE_FASIT_SECRET_REQUEST}}