import React, { Component, Fragment } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Chart, Line } from 'react-chartjs-2'
import "hammerjs";
import * as zoomm from 'chartjs-plugin-zoom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCondenserData } from "../../actions/functions";
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiGraphql } from '@mdi/js';

var timeData = []
var chartData = []
var chartData2 = []
let div
export class ChartComponent extends Component {
    static propTypes = {
        timeData: PropTypes.array.isRequired,
        ongoing: PropTypes.array.isRequired,
        condenserData: PropTypes.array.isRequired,
        kettleData: PropTypes.array.isRequired,
        getCondenserData: PropTypes.func.isRequired,

    };
    componentDidMount() {
        this.props.getCondenserData(this.props.ongoing[0].recordID)
        Chart.pluginService.register(zoomm)
    }
    componentWillUnmount() {
        timeData = []
        chartData = []
        chartData2 = []
    }

    handleZoomReset = () => {
        this.lineReference.chartInstance.resetZoom(1000)
    }

    render() {

        const conData = this.props.condenserData
        const ketData = this.props.kettleData
        const timData = this.props.timeData
        if (conData && conData.constructor === Array && conData.length === 0 && ketData && ketData.ketstructor === Array && ketData.length === 0) {
            return (
                <Fragment>
                    <div className="d-flex justify-content-center align-middle" style={{ paddingTop: '10px', margin: '0' }}>
                        <CircularProgress />
                    </div>
                </Fragment>
            )
        } else {
            timeData = timData
            chartData = conData
            chartData2 = ketData

            var data = {
                labels: timeData,//[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                datasets: [
                    {
                        label: "Condenser",
                        data: chartData,//[{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }],
                        fill: false,
                        borderWidth: 1.5,
                        borderColor: 'rgba(183, 42, 42, 1)',
                        backgroundColor: 'rgba(183, 42, 42, 1)',
                        pointRadius: 0,
                        pointHoverRadius: 5,
                    },
                    {
                        label: "Kettle",
                        data: chartData2,//[{ x: 0, y: 9 }, { x: 1, y: 8 }, { x: 2, y: 7 }, { x: 3, y: 6 }, { x: 4, y: 5 }, { x: 5, y: 4 }],
                        fill: false,
                        borderWidth: 1.5,
                        borderColor: 'rgba(42, 183, 49, 1)',
                        backgroundColor: 'rgba(42, 183, 49, 1)',
                        pointRadius: 0,
                        pointHoverRadius: 5,
                    }
                ]
            };

            var options = {
                responsive: true,
                maintainAspectRatio: false,
                //animation: false,
                animation: {
                    duration: 0,
                    easing: 'easeOutExpo'
                },
                tooltips: {
                    position: 'nearest',
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            maxRotation: 0,
                            source: 'labels',
                            //sampleSize: 5,
                            //autoSkip: true,
                            //maxTicksLimit: 4,

                            callback: function (value, index, values) {
                                if (values.length > 4) {
                                    div = parseInt(values.length / 4)
                                    if (index > 0) {
                                        if ((index + 1) % div === 0) {
                                            if (/\s/.test(value)) {
                                                return value.split(" ");
                                            } else {
                                                return value;
                                            }
                                        } else {
                                            return null
                                        }
                                    }
                                    else if (index == 0) {
                                        if (index % div === 0) {
                                            if (/\s/.test(value)) {
                                                return value.split(" ");
                                            } else {
                                                return value;
                                            }
                                        } else {
                                            return null
                                        }
                                    }
                                    else return null
                                } else {
                                    return null
                                }

                            },
                        },
                        type: 'time',
                        time: {
                            displayFormats: {
                                second: 'H:MM:SS A'
                            }
                        },
                        distribution: 'series',
                    }],
                },
                plugins: {
                    zoom: {
                        zoom: {
                            enabled: true,
                            mode: 'x',
                        },
                        pan: {
                            enabled: true,
                            mode: 'x',
                        }
                    }
                }

            };
            return (
                <Fragment>
                    <div style={{height:300}}>
                        <Typography gutterBottom component="h6" color="secondary">
                            <SvgIcon><path d={mdiGraphql} /></SvgIcon>Temperature Profile
                        </Typography>
                        <Line data={data} options={options} ref={(reference) => this.lineReference = reference} />
                        <div className="form-group float-right">
                            <Button onClick={this.handleZoomReset} color="primary" type="button" variant="outlined">
                                Reset Zoom
                            </Button>
                            <Button onClick={this.handleZoomReset} color="primary" type="button" variant="outlined">
                                All
                            </Button>
                        </div>
                    </div>
                </Fragment>
            )
        }
    }
}

const mapStateToProps = state => ({
    timeData: state.payload.timeData,
    condenserData: state.payload.condenserData,
    kettleData: state.payload.kettleData,
    ongoing: state.ongoing.records
})

export default connect(mapStateToProps, { getCondenserData })(ChartComponent)


/*

 */