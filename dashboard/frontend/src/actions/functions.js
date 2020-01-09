import axios from 'axios'
import { createMessage, returnErrors } from './messages'

import {
    RECORDS_GET,
    RECORDS_NEW,
    RECORDS_DELETE,
    CHART_UPDATE,
    CHART_GET_DATA,
    RECORDS_UPDATE,
} from './types'
import { tokenConfig } from './auth'

/*
//get leads
export const getLeads = () => (dispatch, getState) => {
    axios
        .get('/api/leads/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}



//delete leads
export const deleteLead = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/leads/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteLead: 'Lead Deleted' }))
            dispatch({
                type: DELETE_LEAD,
                payload: id
            });
        })
        .catch(err => console.log(err))
}



//add lead
export const addLead = (lead) => (dispatch, getState) => {
    axios
        .post('/api/leads/', lead, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addLead: 'Lead Added' }))
            dispatch({
                type: ADD_LEAD,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

*/
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
    console.log(store)
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
    console.log(store)
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
