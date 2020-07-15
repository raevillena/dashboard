import {
    RECORDS_NEW,
    RECORDS_GET,
    RECORDS_START,
    RECORDS_END,
    RECORDS_DELETE,
    PROGRESS_CLEAR,
    PROGRESS_GET_DATA,
    PROGRESS_UPDATE_PROGRESS,
    PROGRESS_UPDATE_STATUS,
    PROGRESS_UPDATE_VOLUME,
    LOGOUT_SUCCESS,
} from '../actions/types.js'

const initialState = {
    records: ['noRecord'],
    status: "",
    progress: 0,
    volume: 0
}
let buffer
export default function (state = initialState, action) {
    switch (action.type) {
        case RECORDS_GET:
            return {
                ...state,
                records: action.payload
            }
        case RECORDS_DELETE:
            return {
                ...state,
                records: state.records.filter(record => record.recordID !== action.payload)
            }
        case RECORDS_NEW:
            return {
                ...state,
                records: [...state.records, action.payload]
            }
        case RECORDS_START:
            Object.assign(state.records.find(({ recordID }) => recordID === action.payload.id), { start: action.payload.start, status: action.payload.status })
            return {
                ...state,
                records: [...state.records]
            }
        case RECORDS_END:
            Object.assign(state.records.find(({ recordID }) => recordID === action.payload.id), { duration: action.payload.duration, end: action.payload.end, status: action.payload.status })
            return {
                ...state,
                records: [...state.records]
            }
        case PROGRESS_CLEAR:
            return {
                ...state,
                progress: 0.00,
                status: "",
                volume: 0.00
            }
        case PROGRESS_GET_DATA:
            return {
                ...state,
                progress: action.payload,
                status: action.payload,
                volume: action.payload
            }
        case PROGRESS_UPDATE_PROGRESS:
            return {
                ...state,
                progress: action.payload
            }
        case PROGRESS_UPDATE_STATUS:
            return {
                ...state,
                status: action.payload
            }
        case PROGRESS_UPDATE_VOLUME:
            return {
                ...state,
                volume: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                records: ['noRecord'],
                status: "",
                progress: 0,
                volume: 0
            }
        default:
            return state;
    }
}