import {
    APPLICATION_FASIT_REQUEST,
    APPLICATION_INSTANCES_REQUEST
} from '../actionTypes'

export const fetchFasitData = (name, revision) => {return {type: APPLICATION_FASIT_REQUEST, name, revision}}
export const fetchApplicationInstances = (name) => {return {type: APPLICATION_INSTANCES_REQUEST, name}}
