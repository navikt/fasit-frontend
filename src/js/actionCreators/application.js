import {
    APPLICATION_FASIT_REQUEST,
    APPLICATION_INSTANCES_REQUEST
} from '../actionTypes'

export const fetchFasitData = (name) => {return {type: APPLICATION_FASIT_REQUEST, name}}
export const fetchApplicationInstances = (name) => {return {type: APPLICATION_INSTANCES_REQUEST, name}}

