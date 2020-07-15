//react imports
import React, { Component, Fragment } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";

//function imports
import { getCondenserData, setSampleSize } from "../../actions/functions";

//elements imports
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiGraphql } from '@mdi/js';
import CircularProgress from '@material-ui/core/CircularProgress';

//chart imports
import { Chart, Line } from 'react-chartjs-2'
import "hammerjs";
import * as zoomm from 'chartjs-plugin-zoom'

//constants imports
import { ChartColor1, ChartColor2, color1 } from '../constants/colors'
import { ChartSampleSize } from '../constants/integers'

//samplesize imports
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

//import types
import { SETTING_SAMPLESIZE_CHANGE } from '../../actions/types'

import { CustomSwitch } from '../layout/CustomSwitch'

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        secondary: {
            main: color1,
        },
    },
});

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        height: '100%',
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    bottompaper: {
        padding: theme.spacing(0.5),
        height: '100%',
    },
    chart: {
        marginBottom: theme.spacing(3),
        height: '100%',

    },
});


var timeData = []
var chartData = []
var chartData2 = []
let div
export class ChartComponent extends Component {

    state = {
        sampleSize: ChartSampleSize[0].value,
        enableZoom: false
    }
    static propTypes = {
        timeData: PropTypes.array.isRequired,
        ongoing: PropTypes.array.isRequired,
        condenserData: PropTypes.array.isRequired,
        kettleData: PropTypes.array.isRequired,
        getCondenserData: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired,
    };
    componentDidMount() {
        this.props.getCondenserData(this.props.ongoing[0].recordID, this.state.sampleSize)
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
    handleZoomEnable = (name) => event => {
        this.setState({ [name]: event.target.checked })
    }
    handleSizeChange = (event) => {
        this.props.getCondenserData(this.props.ongoing[0].recordID, event.target.value)
        this.props.setSampleSize(SETTING_SAMPLESIZE_CHANGE, event.target.value)
        this.setState({ sampleSize: event.target.value })
        this.lineReference.chartInstance.resetZoom(1000)
    }

    render() {
        const conData = this.props.condenserData
        const ketData = this.props.kettleData
        const timData = this.props.timeData
        const { classes } = this.props;
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
                        borderColor: ChartColor1,
                        backgroundColor: ChartColor1,
                        pointRadius: 0,
                        pointHoverRadius: 5,
                    },
                    {
                        label: "Kettle",
                        data: chartData2,//[{ x: 0, y: 9 }, { x: 1, y: 8 }, { x: 2, y: 7 }, { x: 3, y: 6 }, { x: 4, y: 5 }, { x: 5, y: 4 }],
                        fill: false,
                        borderWidth: 1.5,
                        borderColor: ChartColor2,
                        backgroundColor: ChartColor2,
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
                            enabled: this.state.enableZoom,
                            mode: 'x',
                            drag: false
                        },
                        pan: {
                            enabled: this.state.enableZoom,
                            mode: 'x',
                        }
                    }
                }

            };
            const enableZoomButtons = (
                <Button onClick={this.handleZoomReset} color="primary" type="button" variant="outlined">
                    Reset
                </Button>
            )
            return (
                <Fragment>
                    <MuiThemeProvider theme={theme}>
                        <div className={classes.root}>
                            <Grid container spacing={1}>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chart}>
                                    <div style={{ height: 300 }}>
                                        <Typography gutterBottom component="h6" color="secondary">
                                            <SvgIcon><path d={mdiGraphql} /></SvgIcon>Temperature Profile
                                        </Typography>
                                        <Line data={data} options={options} ref={(reference) => this.lineReference = reference} />
                                    </div>
                                </Grid>
                                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Grid container justify="space-between">
                                        <Grid item>
                                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                                <Grid item className={classes.bottompaper}>
                                                    Size:
                                                </Grid>
                                                <Grid item className={classes.bottompaper}>
                                                    <FormControl>
                                                        <Select
                                                            labelId="sample-size"
                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                            value={this.state.sampleSize}
                                                            onChange={this.handleSizeChange}
                                                        >
                                                            {ChartSampleSize.map((element, index) =>
                                                                <MenuItem key={index} value={element.value}>{element.name}</MenuItem>
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid container direction="row" justify="flex-end" alignItems="center">
                                                <Grid item className={classes.bottompaper}>
                                                    Zoom:
                                                </Grid>
                                                <Grid item className={classes.bottompaper}>
                                                    <CustomSwitch checked={this.state.enableZoom} onChange={this.handleZoomEnable('enableZoom')} />
                                                </Grid>
                                                <Grid item className={classes.bottompaper}>
                                                    {this.state.enableZoom ? enableZoomButtons : null}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </MuiThemeProvider>
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

export default connect(mapStateToProps, { getCondenserData, setSampleSize })(withStyles(styles)(ChartComponent))


/*

 */