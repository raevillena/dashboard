import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'
import { updateData } from '../../actions/payload'
import { createMessage } from '../../actions/messages'
import { clientStatus, getOngoing } from '../../actions/functions'
import {
  RECEIVED_DISTILLATION_DATA,
  RECEIVED_PROGRESS_DATA,
  CLIENT_CONNECT_SUCCESS,
  CLIENT_CONNECT_FAIL,
  RELAY1,
  RELAY2,
  RELAY3,
  RELAY4,
  RELAY5,
  RELAY6,
  DUTYCYCLE
} from '../../actions/types'

import {
  CONDENSER_TOPIC,
  PROGRESS_TOPIC,
  RELAY1_RX_TOPIC,
  RELAY2_RX_TOPIC,
  RELAY3_RX_TOPIC,
  RELAY4_RX_TOPIC,
  RELAY5_RX_TOPIC,
  RELAY6_RX_TOPIC,
  DC_RX_TOPIC

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
    else if (topic === RELAY1_RX_TOPIC) {
      this.props.updateData(RELAY1, message.toString())
    }
    else if (topic === RELAY2_RX_TOPIC) {
      this.props.updateData(RELAY2, message.toString())
    }
    else if (topic === RELAY3_RX_TOPIC) {
      this.props.updateData(RELAY3, message.toString())
    }
    else if (topic === RELAY4_RX_TOPIC) {
      this.props.updateData(RELAY4, message.toString())
    }
    else if (topic === RELAY5_RX_TOPIC) {
      this.props.updateData(RELAY5, message.toString())
    }
    else if (topic === RELAY6_RX_TOPIC) {
      this.props.updateData(RELAY6, message.toString())
    }
    else if (topic === DC_RX_TOPIC) {
      this.props.updateData(DUTYCYCLE, message.toString())
    }
  }

  //mqtt message events

  handleMqttConnect() {

    client = mqtt.connect(connectionString)

    client.on('connect', () => {
      this.props.createMessage({ clientMqttSuccess: 'Connected to MQTT Server' })
      this.props.clientStatus(CLIENT_CONNECT_SUCCESS, true)
      client.subscribe(CONDENSER_TOPIC)
      client.subscribe(PROGRESS_TOPIC)
      client.subscribe(RELAY1_RX_TOPIC)
      client.subscribe(RELAY2_RX_TOPIC)
      client.subscribe(RELAY3_RX_TOPIC)
      client.subscribe(RELAY4_RX_TOPIC)
      client.subscribe(RELAY5_RX_TOPIC)
      client.subscribe(RELAY6_RX_TOPIC)
      client.subscribe(DC_RX_TOPIC)
    })

    client.on('reconnect', () => {
      this.props.createMessage({ clientMqttError: 'Reconnecting' })
    })

    client.on('close', () => {
      this.props.createMessage({ clientMqttError: 'Connection has been closed' })
      this.props.clientStatus(CLIENT_CONNECT_FAIL, false)
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
    if (isAuthenticated) {
      this.handleMqttConnect()
    }
    return (
      <Fragment />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { updateData, createMessage, clientStatus, getOngoing })(Client)
export { client }