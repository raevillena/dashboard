import { combineReducers } from 'redux';
import errors from './errors'
import messages from './messages'
import auth from './auth'
import records from './records'
import payload from './payload'
import client from './client'
import sap from './sap'
import ongoing from './ongoing'
import relay from './relay'
import settings from './settings'

export default combineReducers({
    client,
    records,
    errors,
    messages,
    auth,
    payload,
    sap,
    ongoing,
    relay,
    settings
});
