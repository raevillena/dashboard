import {
    ONGOING_GET,
    ONGOING_DELETE,
    ONGOING_ADD
} from '../actions/types.js'

const initialState = {
    records: ['noActive']
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ONGOING_GET:
            return {
                ...state,
                records: action.payload
            }
        case ONGOING_ADD:
            return {
                ...state,
                records: [...state.records, action.payload]
            }
        case ONGOING_DELETE:
            return {
                ...state,
                records: state.records.filter(record => record.recordID !== action.payload)
            }
        default:
            return state;
    }
}