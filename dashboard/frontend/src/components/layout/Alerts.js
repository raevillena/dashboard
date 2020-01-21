import React, { Component, Fragment } from 'react'
import { withAlert } from 'react-alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }
    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props
        if (error !== prevProps.error) {
            if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`)
            if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`)
            if (error.msg.message) alert.error(`MSG: ${error.msg.message.join()}`)
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join())
            if (error.msg.username) alert.error(error.msg.username.join())
        }

        if (message !== prevProps.message) {
            if (message.deleteLead) alert.success(message.deleteLead)
            if (message.addLead) alert.success(message.addLead)
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch)
            if (message.sendMqttMessage) alert.success(message.sendMqttMessage)
            if (message.sendMqttError) alert.error(message.sendMqttError)
            if (message.clientMqttError) alert.error(message.clientMqttError)
            if (message.clientMqttSuccess) alert.success(message.clientMqttSuccess)
            if (message.recordsInfo) alert.info(message.recordsInfo)
        }
    }
    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts))
