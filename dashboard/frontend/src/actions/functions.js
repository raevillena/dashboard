import axios from 'axios'
import { createMessage, returnErrors } from './messages'
import { client } from '../components/layout/Client'
import { CONSOLE_TOPIC } from '../components/constants/topics'

import {
    RECORDS_GET,
    RECORDS_NEW,
    RECORDS_DELETE,
    CHART_UPDATE,
    CHART_GET_DATA,
    RECORDS_START,
    RECORDS_END,
    RECORDS_ERROR,
    RECORDS_UPDATE,
    RECORDS_GET_DATA,
    ONGOING_GET,
    ONGOING_ADD,
    ONGOING_DELETE
} from './types'
import { tokenConfig } from './auth'


//set start flag for a record
export const setStart = (id, status) => (dispatch, getState) => {
    const start = Date.now()
    const body = JSON.stringify({ start, status })
    axios
        .put(`/api/records/${id}/`, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ONGOING_ADD,
                payload: res.data
            })
            dispatch(createMessage({ recordsInfo: 'Recording started' }))
            dispatch({
                type: RECORDS_START,
                payload: { id, start, status }
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: RECORDS_ERROR
            })
        })
    resetActiveRecords(CONSOLE_TOPIC, 'start')
}

//edit/update a record
export const updateRecord = (data, id) => (dispatch, getState) => {
    console.log(data, id)
    const body = JSON.stringify(data)
    axios
        .put(`/api/records/${id}/`, body, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addLead: 'Record Updated' }))
            dispatch({
                type: RECORDS_UPDATE,
                payload: res.data
            })
        }).catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: RECORDS_ERROR
            })
        })
}
//set start flag for a record
export const setEnd = (id, start, status) => (dispatch, getState) => {
    const end = Date.now()
    const duration = end - parseInt(start)
    const body = JSON.stringify({ duration, end, status })
    axios
        .put(`/api/records/${id}/`, body, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addLead: 'Recording Finished' }))
            dispatch({
                type: ONGOING_DELETE,
                payload: id
            })
            dispatch({
                type: RECORDS_END,
                payload: { id, duration, end, status }
            })

        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: RECORDS_ERROR
            })
        })
    resetActiveRecords(CONSOLE_TOPIC, 'stop')
}

//get Records
export const getRecords = () => (dispatch, getState) => {
    axios
        .get('/api/records/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: RECORDS_GET,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//get active distillation
export const getOngoing = () => (dispatch, getState) => {
    axios
        .get('/api/records/?status=Active', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ONGOING_GET,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}


//delete store
export const deleteRecord = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/records/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteLead: 'Record removed' }))
            dispatch({
                type: RECORDS_DELETE,
                payload: id
            });
        })
        .catch(err => console.log(err))
}


//add Record
export const addRecord = (topic, sap_brix, sap_volume, sap_origin, sap_fermentation, sap_date_collected) => (dispatch, getState) => {
    const body = JSON.stringify({ topic, sap_brix, sap_volume, sap_origin, sap_fermentation, sap_date_collected })
    axios
        .post('/api/records/', body, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addLead: 'Record Added' }))
            dispatch({
                type: RECORDS_NEW,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}


//get condenser data from database
export const getCondenserData = (id, size) => (dispatch, getState) => {
    axios
        //.get(`/api/recorddata/?batch=${id}${size = 'all' ? '' : `&sampleSize=${size}`}`, tokenConfig(getState))
        .get(`/api/recorddata/?batch=${id}&sampleSize=${size}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CHART_GET_DATA,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}


//get condenser data from database
export const getRecordData = (id) => (dispatch, getState) => {
    axios
        .get(`/api/recorddata/?batch=${id}&sampleSize=all`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: RECORDS_GET_DATA,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//fn for client dispatches
export const clientStatus = (type, data) => (dispatch) => {
    dispatch({
        type: type,
        payload: data
    });
}

//fn for settign change dispatch
export const setSampleSize = (type, data) => (dispatch) => {
    dispatch({
        type: type,
        payload: data
    });
}



//local function
function resetActiveRecords(topic, data) {
    const options = { qos: 1 }
    client.publish(topic, `${data}`, options)
}

