import React, { Component, Fragment } from 'react'
import ChartistGraph from 'react-chartist';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getKettleData } from "../../actions/functions";

import Legend from 'chartist-plugin-legend'

var chartData = []

export class ChartKettle extends Component {
    state = {
        messageID: "2",
        message: "",
    }

    static propTypes = {
        kettleData: PropTypes.object.isRequired,
        kettle: PropTypes.number,
        getKettleData: PropTypes.func.isRequired,

    };

    componentDidMount() {
        this.props.getKettleData(this.state.messageID)
    }
    componentWillUnmount() {
        chartData = []
    }

    render() {
        if (chartData != null) {
            chartData = this.props.kettleData.kettleData
        }
        var data = {
            labels: ['Monday', , , 'Tuesday', , , 'Wednesday', , 'Thursday', , 'Friday'],
            series: [
                [],
                chartData
            ]
        };
        var options = {
            width: '100%',
            height: '180px',
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
    kettleData: state.kettleData,
    kettle: state.payload.kettle
})

export default connect(mapStateToProps, { getKettleData })(ChartKettle)
