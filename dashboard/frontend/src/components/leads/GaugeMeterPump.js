import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import GaugeChart from './lib';

let prevPercent = 0.00
export class GaugeMeterPump extends Component {

    render() {
        const { pump } = this.props

        return (
            <div>
                <GaugeChart
                    id="gauge-pump"
                    nrOfLevels={10}
                    colors={["#b8b9ba", "#35b5c6", "#3584c6"]}
                    arcWidth={0.3}
                    percent={pump / 100}
                    lastpercent={prevPercent}
                    textColor="#FFC371"
                    cornerRadius={0}
                />

                <h3 className="font-weight-bold text-center text-secondary">{((prevPercent = pump / 100) * 100).toFixed(2)}%</h3>

            </div>
        )
    }
}

GaugeMeterPump.propTypes = {
    pump: PropTypes.number
};
const mapStateToProps = state => ({
    pump: state.payload.pump
})

export default connect(mapStateToProps, {})(GaugeMeterPump)
