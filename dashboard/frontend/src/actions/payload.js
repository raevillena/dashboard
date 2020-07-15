import { client } from '../components/layout/Client'

//update mqtt sent data
export const updateData = (type, data) => (dispatch) => {
    dispatch({
        type: type,
        payload: data
    });
}

//update switches payload
export const sendSwitches = (topic, data) => (dispatch) => {
    const options = { retain: true, qos: 1 }
    if (data) {
        data = 1
    } else {
        data = 0
    }
    client.publish(topic, `${data}`, options)
}

//update DC payload
export const sendDC = (topic, data) => (dispatch) => {
    const options = { retain: true, qos: 1 }
    if (data) {

    } else {
        data = 0
    }
    client.publish(topic, `${data}`, options)
}