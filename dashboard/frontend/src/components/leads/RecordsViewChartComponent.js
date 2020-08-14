//react imports
import React, { Component, Fragment } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";

//function imports
import { getRecordData } from "../../actions/functions";

//elements imports
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { mdiGraphql } from '@mdi/js';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

//chart imports
import { Chart, Line } from 'react-chartjs-2'
import "hammerjs";
import * as zoomm from 'chartjs-plugin-zoom'

//constants imports
import { ChartColor1, ChartColor2, color1 } from '../constants/colors'
import { ChartSampleSize } from '../constants/integers'

//import moment to parse timestamps
import moment from 'moment';

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
    paper2: {
        margin: theme.spacing(2),
        height: '100%',
        textAlign: 'left',
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


let div
let renderCount = 0
export class RecordsViewChartComponent extends Component {

    state = {
        enableZoom: false
    }
    static propTypes = {
        timeData: PropTypes.array.isRequired,
        condenserData: PropTypes.array.isRequired,
        kettleData: PropTypes.array.isRequired,
        getRecordData: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired,
    };
    componentDidMount() {
        this.props.getRecordData(this.props.record.id)
        Chart.pluginService.register(zoomm)
    }
    componentWillUnmount() {
        renderCount = 0
    }
    handleZoomReset = () => {
        this.lineReference.chartInstance.resetZoom(1000)
    }
    handleDownloadData = (id, name, y, x1, x2) => {
        var csv = 'Timestamp,Condenser Temp, Kettle Temp\n';
        y.forEach((row, index) => {
            csv += moment(row).format('Do MMM YY h:mm:ss A') + ',' + x1[index] + ',' + x2[index] + "\n"
        });
        const element = document.createElement("a");
        const file = new Blob([csv], { type: 'data:text/csv;charset=utf-8' });
        element.href = URL.createObjectURL(file);
        element.download = `${id}-${name}.csv`;
        document.body.appendChild(element);
        element.click();
    }
    handleZoomEnable = (name) => event => {
        this.setState({ [name]: event.target.checked })
        renderCount++
    }
    static getDerivedStateFromProps(nextProps) {
        renderCount++
        return { nextProps }
    }
    render() {
        const conData = this.props.condenserData
        const ketData = this.props.kettleData
        const timData = this.props.timeData
        const { classes, record } = this.props

        if ((renderCount % 2) === 1) {
            return (
                <Fragment>
                    <div className="d-flex justify-content-center align-middle" style={{ paddingTop: '10px', marginBottom: '10px'  }}>
                        <CircularProgress />
                    </div>
                </Fragment>
            )
        } else if (conData && conData.constructor === Array && conData.length === 0) {
            return (
                <Fragment>
                    <MuiThemeProvider theme={theme}>
                        <div className={classes.root}>
                            <Grid container>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chart}>
                                    <div className="d-flex justify-content-center align-middle">
                                        <h2>No Record Data</h2>
                                    </div>
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                    <Grid container direction="row" justify="flex-start" alignItems="center">
                                        <Grid item>
                                            <Button onClick={() => this.props.cancel('view')} color="primary">
                                                Close
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </MuiThemeProvider>
                </Fragment>
            )
        } else {

            var data = {
                labels: timData,
                datasets: [
                    {
                        label: "Condenser",
                        data: conData,
                        fill: false,
                        borderWidth: 1.5,
                        borderColor: ChartColor1,
                        backgroundColor: ChartColor1,
                        pointRadius: 0,
                        pointHoverRadius: 5,
                    },
                    {
                        label: "Kettle",
                        data: ketData,
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
                tooltips: {
                    position: 'nearest',
                    mode: 'index',
                    intersect: false,
                },
                //animation: false,
                animation: {
                    easing: 'easeOutExpo'
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            maxRotation: 0,
                            source: 'labels',
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
                                millisecond: 'H:MM:SS A',
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
                            <Grid container>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chart}>
                                    <div style={{ height: 300 }}>
                                        <Typography gutterBottom component="h6" color="secondary">
                                            <SvgIcon><path d={mdiGraphql} /></SvgIcon>Temperature Profile
                                        </Typography>
                                        <Line data={data} options={options} ref={(reference) => this.lineReference = reference} />
                                    </div>
                                </Grid>
                                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Grid container justify="space-between" alignItems="center">
                                        <Grid item>
                                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                                <Grid item className={classes.bottompaper}>
                                                    <Button onClick={() => this.props.cancel('view')} color="primary">
                                                        Cancel
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid container direction="row" justify="flex-end" alignItems="center">
                                                <Grid item className={classes.bottompaper}>
                                                    <Tooltip title="Save Data CSV Format">
                                                        <IconButton aria-label="New Batch" onClick={() => this.handleDownloadData(record.id, record.name, timData, conData, ketData)} size="medium">
                                                            <SaveAltIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>
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
    timeData: state.records.timeData,
    condenserData: state.records.condenserData,
    kettleData: state.records.kettleData,
})

export default connect(mapStateToProps, { getRecordData })(withStyles(styles)(RecordsViewChartComponent))


/*

 */