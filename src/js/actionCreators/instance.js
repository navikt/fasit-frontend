import {
    INSTANCE_FASIT_REQUEST,
    INSTANCE_MANIFEST_FASIT_REQUEST
} from '../actionTypes'

export const fetchInstance = (id, revision) => {return {type: INSTANCE_FASIT_REQUEST, id, revision}}
export const fetchManifest = () => {return {type: INSTANCE_MANIFEST_FASIT_REQUEST}}
