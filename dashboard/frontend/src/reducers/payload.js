import {
    RECEIVED_DISTILLATION_DATA,
    CHART_CLEAR,
    CHART_GET_DATA,
    CHART_UPDATE,
    LOGOUT_SUCCESS,
    SETTING_SAMPLESIZE_CHANGE
} from '../actions/types.js'

const initialState = {
    condenserData: [],
    kettleData: [],
    heaterData: [],
    pumpData: [],
    timeData: [],
    heater: 0.00,
    pump: 0.00,
    condenser: "0.00",
    kettle: "0.00"
}
import { ChartSampleSize } from '../components/constants/integers'

let data, timestamp, last
let arr_length = ChartSampleSize[0].value

export default function (state = initialState, action) {
    switch (action.type) {
        case SETTING_SAMPLESIZE_CHANGE:
            arr_length = action.payload
            return state;

        case RECEIVED_DISTILLATION_DATA:
            timestamp = new Date().getTime()
            data = JSON.parse(action.payload)
            if (data.length === 4) {
                if (state.condenserData.length >= arr_length) {
                    return {
                        ...state,
                        condenser: parseFloat(data[0].toFixed(2)),
                        kettle: parseFloat(data[1].toFixed(2)),
                        heater: data[2],
                        pump: data[3],
                        condenserData: [...state.condenserData, data[0]].splice(1, arr_length),
                        kettleData: [...state.kettleData, data[1]].splice(1, arr_length),
                        heaterData: [...state.heaterData, data[2]].splice(1, arr_length),
                        pumpData: [...state.pumpData, data[3]].splice(1, arr_length),
                        timeData: [...state.timeData, timestamp].splice(1, arr_length)
                    }
                }
                else {
                    return {
                        ...state,
                        condenser: data[0].toFixed(2),
                        kettle: data[1].toFixed(2),
                        heater: data[2],
                        pump: data[3],
                        condenserData: [...state.condenserData, data[0]],
                        kettleData: [...state.kettleData, data[1]],
                        heaterData: [...state.heaterData, data[2]],
                        pumpData: [...state.pumpData, data[3]],
                        timeData: [...state.timeData, timestamp]
                    }
                }
            } else {
                console.log("Data length not completed")
                return {
                    ...state,
                }
            }
        case CHART_GET_DATA:
            if (action.payload != 0) {
                last = JSON.parse(action.payload[action.payload.length - 1].data)
                return {
                    ...state,
                    condenser: parseFloat(last[1].toFixed(2)),
                    kettle: parseFloat(last[2].toFixed(2)),
                    heater: last[3],
                    pump: last[4],
                    timeData: action.payload.map(u => JSON.parse(u.data)[0]),
                    condenserData: action.payload.map(u => JSON.parse(u.data)[1]),
                    kettleData: action.payload.map(u => JSON.parse(u.data)[2]),
                    heaterData: action.payload.map(u => JSON.parse(u.data)[3]),
                    pumpData: action.payload.map(u => JSON.parse(u.data)[4])
                }
            } else {
                return {
                    ...state
                }
            }

        case CHART_CLEAR:
            return {
                ...state,
                condenserData: [],
                kettleData: [],
                heaterData: [],
                pumpData: [],
                timeData: [],
                heater: 0.00,
                pump: 0.00,
                condenser: 0.00,
                kettle: 0.00
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                condenserData: [],
                kettleData: [],
                heaterData: [],
                pumpData: [],
                timeData: [],
                heater: 0.00,
                pump: 0.00,
                condenser: 0.00,
                kettle: 0.00
            }
        case CHART_UPDATE:
            return {
                ...state,
                condenserData: [...state.condenserData, action.payload]
            }

        default:
            return state;
    }
}