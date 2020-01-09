import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { createMessage } from '../../actions/messages'
import { connect } from 'react-redux'

import { client } from '../layout/Client'

export class SetButton extends Component {

    onSubmit = e => {
        e.preventDefault();
        this.props.isConnected 
        if (this.props.isConnected ) {
            client.publish(this.props.topic, `${this.props.value}`)
            this.props.createMessage({ sendMqttMessage: `Setting changed to ${this.props.value}` })
        } else {
            this.props.createMessage({ sendMqttError: 'Server Not Connected' })
        }

    };
    render() {
        return (
            <div style={{ marginLeft: '5px' }}>
                <form onSubmit={this.onSubmit}>
                    <button type="submit" className="btn btn-primary">
                        Set
                    </button>
                </form>
            </div>
        )
    }
}

SetButton.propTypes = {
    isConnected: PropTypes.bool,
};
const mapStateToProps = state => ({
    isConnected: state.client.isConnected
})

export default connect(mapStateToProps, { createMessage })(SetButton)
