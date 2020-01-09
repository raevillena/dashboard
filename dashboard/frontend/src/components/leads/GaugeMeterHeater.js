import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import GaugeChart from './lib';

let prevPercent = 0.00
export class GaugeMeterHeater extends Component {

    render() {
        const { heater } = this.props

        return (
            <div>
                <GaugeChart
                    id="gauge-heater"
                    nrOfLevels={10}
                    colors={["#aaaaaa", "#FFC371", "#FF5F6D"]}
                    arcWidth={0.3}
                    percent={heater / 100}
                    lastpercent={prevPercent}
                    textColor="#FFC371"
                    cornerRadius={0}
                />
                <h3 className="font-weight-bold text-center text-secondary">{((prevPercent = heater / 100) * 100).toFixed(2)}%</h3>

            </div>
        )
    }
}

GaugeMeterHeater.propTypes = {
    heater: PropTypes.number
};
const mapStateToProps = state => ({
    heater: state.payload.heater
})

export default connect(mapStateToProps, {})(GaugeMeterHeater)
