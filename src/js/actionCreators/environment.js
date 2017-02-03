import {
    ENVIRONMENT_FASIT_REQUEST
} from '../actionTypes'

export const fetchEnvironment = (id ,revision) => {return {type: ENVIRONMENT_FASIT_REQUEST, id, revision}}