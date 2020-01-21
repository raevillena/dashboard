import axios from 'axios'
import { createMessage, returnErrors } from './messages'

import {
    RECORDS_GET,
    RECORDS_NEW,
    RECORDS_DELETE,
    CHART_UPDATE,
    CHART_GET_DATA,
    RECORDS_START,
    RECORDS_END,
    RECORDS_ERROR,
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
}

//get stores
export const getStores = () => (dispatch, getState) => {
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
export const deleteStore = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/records/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteLead: 'Record Deleted' }))
            dispatch({
                type: RECORDS_DELETE,
                payload: id
            });
        })
        .catch(err => console.log(err))
}

//add store
export const addStore = (store) => (dispatch, getState) => {
    axios
        .post('/api/records/', store, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addLead: 'Record Added' }))
            dispatch({
                type: RECORDS_NEW,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//add store in array form one request
export const addStoreData = (store) => (dispatch, getState) => {
    axios
        .post('/api/records/', store, tokenConfig(getState))
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
export const getCondenserData = (id) => (dispatch, getState) => {
    axios
        .get(`/api/recorddata/?batch=${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CHART_GET_DATA,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//get condenser data from database
export const getKettleData = (id) => (dispatch, getState) => {
    axios
        .get(`/api/recorddata/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CHART_GET_DATA,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}


export const clientStatus = (type, data) => (dispatch) => {
    dispatch({
        type: type,
        payload: data
    });
}
