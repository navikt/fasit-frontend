import {
    INSTANCE_FASIT_RECEIVED,
    INSTANCE_FASIT_FETCHING,
    INSTANCE_FASIT_REQUEST_FAILED,
    INSTANCE_MANIFEST_FASIT_FETCHING,
    INSTANCE_MANIFEST_FASIT_RECEIVED,
    INSTANCE_MANIFEST_FASIT_REQUEST_FAILED
} from '../actionTypes'

export default (state = {
    data: {},
    isFetching: false,
    requestFailed: false,
    manifest: "<no><manifest><here>:)</here></manifest></no>"
}, action) => {
    switch (action.type) {
        case INSTANCE_FASIT_FETCHING:
            return Object.assign({}, state, {
                data: {},
                isFetching: true,
                requestFailed: false
            })
        case INSTANCE_FASIT_RECEIVED:
            return Object.assign({}, state, {
                data: action.value,
                isFetching: false,
                requestFailed: false
            })
        case INSTANCE_FASIT_REQUEST_FAILED:
            return Object.assign({}, state, {
                requestFailed: action.error.message,
                data: {},
                isFetching: false
            })
        case INSTANCE_MANIFEST_FASIT_FETCHING:
            return Object.assign({}, state, {
                manifest: {},
                isFetchingManifest: true,
                requestManifestFailed: false
            })
        case INSTANCE_MANIFEST_FASIT_RECEIVED:
            return Object.assign({}, state, {
                manifest: action.value,
                isFetchingManifest: false,
                requestManifestFailed: false
            })
        case INSTANCE_MANIFEST_FASIT_REQUEST_FAILED:
            return Object.assign({}, state, {
                requestManifestFailed: action.error.message,
                manifest: {},
                isFetchingManifest: false
            })

        default:
            return state
    }
}