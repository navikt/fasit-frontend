import {
    NODE_SERA_REQUEST
} from '../actionTypes'

export const fetchSeraData = (hostname) => {
    return (dispatch) => {
        dispatch({type: NODE_SERA_REQUEST, hostname})
    }
}
