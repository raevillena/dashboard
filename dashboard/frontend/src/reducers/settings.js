import {
    SETTING_SAMPLESIZE_CHANGE
} from '../actions/types.js'

import { ChartSampleSize } from '../components/constants/integers'

const initialState = {
    sampleSize: ChartSampleSize[0].value
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SETTING_SAMPLESIZE_CHANGE:
            return {
                ...state,
                sampleSize: action.payload
            }
        default:
            return state;
    }
}