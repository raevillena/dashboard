import {
    SAP_CLEAR,
    SAP_GET_DATA

} from '../actions/types.js'

const initialState = {
    brix: 0,
    volume: 0,
    origin: "",
    fermentation: 0,
    date: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAP_GET_DATA:
            return {
                ...state,
                //parse details and map
                brix: 0,
                volume: 0,
                origin: "",
                fermentation: 0,
                date: "",
            }
        case SAP_CLEAR:
            return {
                ...state,
                brix: 0,
                volume: 0,
                origin: "",
                fermentation: 0,
                date: "",
            }
        default:
            return state;
    }
}