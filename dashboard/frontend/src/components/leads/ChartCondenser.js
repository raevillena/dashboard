import React, { Component, Fragment } from 'react'
import ChartistGraph from 'react-chartist';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCondenserData } from "../../actions/functions";

import Legend from 'chartist-plugin-legend'

var timeData = []
var chartData = []
var chartData2 = []
var div

export class ChartCondenser extends Component {
    state = {
        recordID: 1,
    }
    static propTypes = {
        timeData: PropTypes.array.isRequired,

        condenser: PropTypes.number.isRequired,
        condenserData: PropTypes.array.isRequired,
        getCondenserData: PropTypes.func.isRequired,

        kettleData: PropTypes.array.isRequired,
        kettle: PropTypes.number.isRequired
    };

    componentDidMount() {
        this.props.getCondenserData(1)
    }
    componentWillUnmount() {
        timeData = []
        chartData = []
        chartData2 = []
    }

    render() {
        if (chartData != null && chartData2 != null) {
            timeData = this.props.timeData
            chartData = this.props.condenserData
            chartData2 = this.props.kettleData
            div = parseInt(chartData.length / 4)
        }

        var data = {
            labels: timeData,
            series: [
                { "name": "Condenser", "data": chartData },
                { "name": "Kettle", "data": chartData2 }
            ]
        };

        var options = {
            width: '100%',
            height: '250px',
            showPoint: false,
            chartPadding: {
                right: 40
            },
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    if (index == 0) return (index) % div === 0 ? value : null;
                    else return (index + 1) % div === 0 ? value : null;
                }
            },
            stroke: 'blue',
            plugins: [
                Legend()
            ]
        };

        var type = 'Line'
        return (
            <Fragment>
                <div>
                    <ChartistGraph className={'ct-chart'} data={data} options={options} type={type} />
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    timeData: state.payload.timeData,

    condenserData: state.payload.condenserData,
    condenser: state.payload.kettle,

    kettleData: state.payload.kettleData,
    kettle: state.payload.kettle
})

export default connect(mapStateToProps, { getCondenserData })(ChartCondenser)
