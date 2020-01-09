import {
    CLIENT_CONNECT_FAIL,
    CLIENT_CONNECT_SUCCESS
} from '../actions/types'

const initialState = {
    isConnected: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CLIENT_CONNECT_FAIL:
        case CLIENT_CONNECT_SUCCESS:
            return {
                ...state,
                isConnected: action.payload
            }
        default:
            return state
    }
}