import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'
import { updateData } from '../../actions/payload'
import { createMessage } from '../../actions/messages'
import { clientStatus } from '../../actions/functions'
import {
  RECEIVED_DISTILLATION_DATA,
  RECEIVED_PROGRESS_DATA,
  CLIENT_CONNECT_SUCCESS,
  CLIENT_CONNECT_FAIL
} from '../../actions/types'

import {
  CONDENSER_TOPIC,
  KETTLE_TOPIC,
  HEATER_TOPIC,
  PUMP_TOPIC,
  PROGRESS_TOPIC,
  HEATER_SETTING_TOPIC,
  PUMP_SETTING_TOPIC

} from '../constants/topics'

import { connectionString } from '../constants/mqttconnectionstring'
var mqtt = require('mqtt')
var client

export class Client extends Component {
  static propTypes = {
    auth: Proptypes.object.isRequired,
    updateData: Proptypes.func.isRequired,
  }

  handleMessages = (topic, message) => {
    if (topic === CONDENSER_TOPIC) {
      this.props.updateData(RECEIVED_DISTILLATION_DATA, message.toString())
    }
    else if (topic === PROGRESS_TOPIC) {
      this.props.updateData(RECEIVED_PROGRESS_DATA, parseFloat(message.toString()))
    }
  }

  //mqtt message events

  handleMqttConnect() {
    console.log('handleconnect')

    client = mqtt.connect(connectionString)

    client.on('connect', () => {
      console.log('client connected to server')
      this.props.createMessage({ clientMqttSuccess: 'Connected to MQTT Server' })
      this.props.clientStatus(CLIENT_CONNECT_SUCCESS, true)
      client.subscribe(HEATER_SETTING_TOPIC)
      client.subscribe(PUMP_SETTING_TOPIC)
      client.subscribe(CONDENSER_TOPIC)
      client.subscribe(KETTLE_TOPIC)
      client.subscribe(PUMP_TOPIC)
      client.subscribe(HEATER_TOPIC)
      client.subscribe(PROGRESS_TOPIC)
    })

    client.on('reconnect', () => {
      this.props.createMessage({ clientMqttError: 'Reconnecting' })
    })
    client.on('error', (error) => {
      console.log(error)
    })
    client.on('close', () => {
      this.props.createMessage({ clientMqttError: 'Connection has been closed' })
      this.props.clientStatus(CLIENT_CONNECT_FAIL, false)
    })

    client.on('offline', () => {
      console.log('client is offline')
    })

    client.on('message', (topic, message) => {
      this.handleMessages(topic, message)
    })

    client.on('end', () => {
      this.props.createMessage({ clientMqttSuccess: 'Disconnected to MQTT Server Successfully' })
      this.props.clientStatus(CLIENT_CONNECT_FAIL, false)
    })
  }

  render() {
    const { isAuthenticated } = this.props.auth
    console.log('client re rendered')
    if (isAuthenticated) {
      this.handleMqttConnect()
    } else {

    }
    return (
      <Fragment />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { updateData, createMessage, clientStatus })(Client)
export { client }