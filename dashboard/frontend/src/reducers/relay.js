import {
    RELAY1, RELAY2, RELAY3, RELAY4, RELAY5, RELAY6, DUTYCYCLE
} from '../actions/types.js'

const initialState = {
    relay1: false,
    relay2: false,
    relay3: false,
    relay4: false,
    relay5: false,
    relay6: false,
    dutycycle: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RELAY1:
            if (action.payload === "1" || action.payload === true) {
                return { ...state, relay1: true }
            } else {
                return { ...state, relay1: false }
            }
        case RELAY2:
            if (action.payload === "1" || action.payload === true) {
                return { ...state, relay2: true }
            } else {
                return { ...state, relay2: false }
            }
        case RELAY3:
            if (action.payload === "1" || action.payload === true) {
                return { ...state, relay3: true }
            } else {
                return { ...state, relay3: false }
            }
        case RELAY4:
            if (action.payload === "1" || action.payload === true) {
                return { ...state, relay4: true }
            } else {
                return { ...state, relay4: false }
            }
        case RELAY5:
            if (action.payload === "1" || action.payload === true) {
                return { ...state, relay5: true }
            } else {
                return { ...state, relay5: false }
            }
        case RELAY6:
            if (action.payload === "1" || action.payload === true) {
                return { ...state, relay6: true }
            } else {
                return { ...state, relay6: false }
            }
        case DUTYCYCLE:
            return {
                ...state,
                dutycycle: parseInt(action.payload)
            }
        default:
            return state;
    }
}