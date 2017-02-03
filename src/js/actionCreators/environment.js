import {
    ENVIRONMENT_FASIT_REQUEST
} from '../actionTypes'

export const fetchEnvironment = (name) => {return {type: ENVIRONMENT_FASIT_REQUEST, name}}