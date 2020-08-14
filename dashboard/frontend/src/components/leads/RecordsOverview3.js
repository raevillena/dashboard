import React, { Component, Fragment } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Bar } from 'react-chartjs-2'
import PropTypes from "prop-types"
import { connect } from "react-redux"
//import { getCondenserData } from "../../actions/functions";
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import { groupBy, filter } from 'lodash-es'
import moment from 'moment';

//material ui imports
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

//constants imports
import { ChartColor1, ChartColor2, color1 } from '../constants/colors'
import { GroupbyOptions1, GroupbyOptions3 } from '../constants/integers'
import { maxBarThickness } from '../constants/settings'

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
        paddingLeft: theme.spacing(0.5),
        height: '100%',
    },
    chart: {
        height: '100%',
    },
    title: {
        marginLeft: '24px'
    },
    container: {
        [theme.breakpoints.down('sm')]: {
            direction: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        [theme.breakpoints.up('sm')]: {
            direction: "row",
            justifyContent: "flex-end",
            alignItems: "center",
        },
    }
});

let Allyears = []

export class RecordsOverview3 extends Component {
    static propTypes = {
        records: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired,
    };

    state = {
        groupOption: GroupbyOptions3[0].value,
        colOption: GroupbyOptions1[0].value,
        yearOption: null
    }

    handleGroupChange = (event) => {
        this.setState({ groupOption: event.target.value })
    }
    handleAllYears = (event) => {
        this.setState({ yearOption: event.target.value })
    }
    handleColChange = (event) => {
        this.setState({ colOption: event.target.value })
    }
    serializeDate(month) {
        switch (month) {
            case '0':
                return "Jan"
                break;
            case '1':
                return "Feb"
                break;
            case '2':
                return "Mar"
                break;
            case '3':
                return "Apr"
                break;
            case '4':
                return "May"
                break;
            case '5':
                return "Jun"
                break;
            case '6':
                return "Jul"
                break;
            case '7':
                return "Aug"
                break;
            case '8':
                return "Sep"
                break;
            case '9':
                return "Oct"
                break;
            case '10':
                return "Nov"
                break;
            case '11':
                return "Dec"
                break;
        }
    }
    randomizeBarColor() {
        var r = Math.floor(Math.random() * 256)
        var g = Math.floor(Math.random() * 256)
        var b = Math.floor(Math.random() * 256)
        return "rgba(" + r + "," + g + "," + b + ",1)"
    }

    componentDidMount() {
        Chart.plugins.register({
            beforeDraw: function (chart) {
                chart.config.data.datasets.forEach((dataset, i) => {
                    if (dataset.backgroundColor) {
                        chart.legend.legendItems[i].fillStyle = dataset.backgroundColor;
                        chart.legend.legendItems[i].strokeStyle = dataset.borderColor ? dataset.borderColor : dataset.backgroundColor;
                    }
                });
            }
        });
    }
    render() {
        const { records, classes } = this.props
        const { groupOption, colOption, yearOption } = this.state
        if (records && records.constructor === Array && records.length === 0) {
            return (
                <Fragment>
                    <div className="d-flex justify-content-center align-middle">
                        <h2>No Record Added Yet</h2>
                    </div>
                </Fragment>
            )
        }
        else if (records[0] === "noRecord") {
            return (
                <Fragment>
                    <div className="d-flex justify-content-center align-middle" style={{ paddingTop: '10px', margin: '0' }}>
                        <CircularProgress />
                    </div>
                </Fragment>
            )
        } else {
            let timeData = []
            let XaxisLabel = null
            let YaxisLabel = null
            let AllData = []
            let inner_data = null
            let buffer = null
            let byYear = groupBy(records, d => moment(d.created_at).year())
            Allyears = Object.keys(byYear)
            const yearValue = yearOption || Allyears[Allyears.length - 1]

            switch (groupOption) {
                case GroupbyOptions3[0].value:
                    AllData = []
                    const today = filter(byYear[Allyears[Allyears.length - 1]], d => moment(d.created_at).isSame(moment(), 'day'))
                    const todayOrigin = groupBy(today, d => d.sap_origin);
                    XaxisLabel = "Origin"
                    inner_data = []
                    const VarColor3 = this.randomizeBarColor()
                    switch (colOption) {
                        case GroupbyOptions1[0].value:
                            YaxisLabel = "Liters"
                            Object.entries(todayOrigin).forEach(value => {
                                let sum = 0
                                value[1].map(data => {
                                    sum = sum + parseFloat(data.output_volume)
                                })
                                timeData = [...timeData, value[0]]
                                inner_data = [...inner_data, { x: value[0], y: sum.toFixed(2) }]
                            })
                            buffer = {
                                label: "Ethanol Volume",
                                data: inner_data,
                                fill: false,
                                borderWidth: 1.5,
                                borderColor: VarColor3,
                                backgroundColor: VarColor3,
                                pointRadius: 0,
                                pointHoverRadius: 5,
                                maxBarThickness: maxBarThickness
                            }
                            AllData = [...AllData, buffer]
                            break
                        case GroupbyOptions1[1].value:
                            YaxisLabel = "Liters"
                            Object.entries(todayOrigin).forEach(value => {
                                let sum = 0
                                value[1].map(data => {
                                    sum = sum + parseFloat(data.sap_volume)
                                })
                                timeData = [...timeData, value[0]]
                                inner_data = [...inner_data, { x: value[0], y: sum.toFixed(2) }]
                            })
                            buffer = {
                                label: "Sap Volume",
                                data: inner_data,
                                fill: false,
                                borderWidth: 1.5,
                                borderColor: VarColor3,
                                backgroundColor: VarColor3,
                                pointRadius: 0,
                                pointHoverRadius: 5,
                                maxBarThickness: maxBarThickness
                            }
                            AllData = [...AllData, buffer]
                            break
                        case GroupbyOptions1[2].value:
                            YaxisLabel = "Number of Batches"
                            Object.entries(todayOrigin).forEach(value => {
                                timeData = [...timeData, value[0]]
                                inner_data = [...inner_data, { x: value[0], y: value[1].length }]
                            })
                            buffer = {
                                label: "Count",
                                data: inner_data,
                                fill: false,
                                borderWidth: 1.5,
                                borderColor: VarColor3,
                                backgroundColor: VarColor3,
                                pointRadius: 0,
                                pointHoverRadius: 5,
                                maxBarThickness: maxBarThickness
                            }
                            AllData = [...AllData, buffer]
                            break
                    }
                    break;
                case GroupbyOptions3[1].value:
                    AllData = []
                    const thisWeek = filter(byYear[Allyears[Allyears.length - 1]], d => moment(d.created_at).isSame(moment(), 'week'))
                    const thisWeekOrigin = groupBy(thisWeek, d => d.sap_origin);
                    XaxisLabel = "Origin"
                    inner_data = []
                    const VarColor2 = this.randomizeBarColor()
                    switch (colOption) {
                        case GroupbyOptions1[0].value:
                            YaxisLabel = "Liters"
                            Object.entries(thisWeekOrigin).forEach(value => {
                                let sum = 0
                                value[1].map(data => {
                                    sum = sum + parseFloat(data.output_volume)
                                })
                                timeData = [...timeData, value[0]]
                                inner_data = [...inner_data, { x: value[0], y: sum.toFixed(2) }]
                            })
                            buffer = {
                                label: "Ethanol Volume",
                                data: inner_data,
                                fill: false,
                                borderWidth: 1.5,
                                borderColor: VarColor2,
                                backgroundColor: VarColor2,
                                pointRadius: 0,
                                pointHoverRadius: 5,
                                maxBarThickness: maxBarThickness
                            }
                            AllData = [...AllData, buffer]
                            break
                        case GroupbyOptions1[1].value:
                            YaxisLabel = "Liters"
                            Object.entries(thisWeekOrigin).forEach(value => {
                                let sum = 0
                                value[1].map(data => {
                                    sum = sum + parseFloat(data.sap_volume)
                                })
                                timeData = [...timeData, value[0]]
                                inner_data = [...inner_data, { x: value[0], y: sum.toFixed(2) }]
                            })
                            buffer = {
                                label: "Sap Volume",
                                data: inner_data,
                                fill: false,
                                borderWidth: 1.5,
                                borderColor: VarColor2,
                                backgroundColor: VarColor2,
                                pointRadius: 0,
                                pointHoverRadius: 5,
                                maxBarThickness: maxBarThickness
                            }
                            AllData = [...AllData, buffer]
                            break
                        case GroupbyOptions1[2].value:
                            YaxisLabel = "Number of Batches"
                            Object.entries(thisWeekOrigin).forEach(value => {
                                timeData = [...timeData, value[0]]
                                inner_data = [...inner_data, { x: value[0], y: value[1].length }]
                            })
                            buffer = {
                                label: "Count",
                                data: inner_data,
                                fill: false,
                                borderWidth: 1.5,
                                borderColor: VarColor2,
                                backgroundColor: VarColor2,
                                pointRadius: 0,
                                pointHoverRadius: 5,
                                maxBarThickness: maxBarThickness
                            }
                            AllData = [...AllData, buffer]
                            break
                    }
                    break;
                case GroupbyOptions3[2].value:
                    AllData = []
                    const thisMonth = filter(byYear[Allyears[Allyears.length - 1]], d => moment(d.created_at).isSame(moment(), 'month'))
                    const thisMonthOrigin = groupBy(thisMonth, d => d.sap_origin);
                    XaxisLabel = "Origin"
                    inner_data = []
                    const VarColor1 = this.randomizeBarColor()
                    switch (colOption) {
                        case GroupbyOptions1[0].value:
                            YaxisLabel = "Liters"
                            Object.entries(thisMonthOrigin).forEach(value => {
                                let sum = 0
                                value[1].map(data => {
                                    sum = sum + parseFloat(data.output_volume)
                                })
                                timeData = [...timeData, value[0]]
                                inner_data = [...inner_data, { x: value[0], y: sum.toFixed(2) }]
                            })
                            buffer = {
                                label: "Ethanol Volume",
                                data: inner_data,
                                fill: false,
                                borderWidth: 1.5,
                                borderColor: VarColor1,
                                backgroundColor: VarColor1,
                                pointRadius: 0,
                                pointHoverRadius: 5,
                                maxBarThickness: maxBarThickness
                            }
                            AllData = [...AllData, buffer]
                            break
                        case GroupbyOptions1[1].value:
                            YaxisLabel = "Liters"
                            Object.entries(thisMonthOrigin).forEach(value => {
                                let sum = 0
                                value[1].map(data => {
                                    sum = sum + parseFloat(data.sap_volume)
                                })
                                timeData = [...timeData, value[0]]
                                inner_data = [...inner_data, { x: value[0], y: sum.toFixed(2) }]
                            })
                            buffer = {
                                label: "Sap Volume",
                                data: inner_data,
                                fill: false,
                                borderWidth: 1.5,
                                borderColor: VarColor1,
                                backgroundColor: VarColor1,
                                pointRadius: 0,
                                pointHoverRadius: 5,
                                maxBarThickness: maxBarThickness
                            }
                            AllData = [...AllData, buffer]
                            break
                        case GroupbyOptions1[2].value:
                            YaxisLabel = "Number of Batches"
                            Object.entries(thisMonthOrigin).forEach(value => {
                                timeData = [...timeData, value[0]]
                                inner_data = [...inner_data, { x: value[0], y: value[1].length }]
                            })
                            buffer = {
                                label: "Count",
                                data: inner_data,
                                fill: false,
                                borderWidth: 1.5,
                                borderColor: VarColor1,
                                backgroundColor: VarColor1,
                                pointRadius: 0,
                                pointHoverRadius: 5,
                                maxBarThickness: maxBarThickness
                            }
                            AllData = [...AllData, buffer]
                            break
                    }
                    break;
                case GroupbyOptions3[3].value:
                    AllData = []
                    const whatmon = groupBy(byYear[yearValue], d => moment(d.created_at).month())
                    Object.keys(whatmon).forEach(key => {
                        timeData = [...timeData, this.serializeDate(key)]
                    })
                    const byOrigin = groupBy(byYear[yearValue], d => d.sap_origin);
                    XaxisLabel = "Month"
                    switch (colOption) {
                        case GroupbyOptions1[0].value:
                            YaxisLabel = "Liters"
                            Object.entries(byOrigin).forEach(value => {
                                inner_data = []
                                const byMonth = groupBy(value[1], d => moment(d.created_at).month())
                                Object.entries(byMonth).forEach(value => {
                                    let sum = 0
                                    value[1].map(data => {
                                        sum = sum + parseFloat(data.output_volume)
                                    })
                                    inner_data = [...inner_data, { x: this.serializeDate(value[0]), y: sum.toFixed(2) }]
                                })
                                const VarColor = this.randomizeBarColor()
                                buffer = {
                                    label: value[0],
                                    data: inner_data,
                                    fill: false,
                                    borderWidth: 1.5,
                                    borderColor: VarColor,
                                    backgroundColor: VarColor,
                                    pointRadius: 0,
                                    pointHoverRadius: 5,
                                    maxBarThickness: maxBarThickness
                                }
                                AllData = [...AllData, buffer]
                            })
                            break;
                        case GroupbyOptions1[1].value:
                            YaxisLabel = "Liters"
                            Object.entries(byOrigin).forEach(value => {
                                inner_data = []
                                const byMonth = groupBy(value[1], d => moment(d.created_at).month())
                                Object.entries(byMonth).forEach(value => {
                                    let sum = 0
                                    value[1].map(data => {
                                        sum = sum + parseFloat(data.sap_volume)
                                    })
                                    inner_data = [...inner_data, { x: this.serializeDate(value[0]), y: sum.toFixed(2) }]
                                })
                                const VarColor = this.randomizeBarColor()
                                buffer = {
                                    label: value[0],
                                    data: inner_data,
                                    fill: false,
                                    borderWidth: 1.5,
                                    borderColor: VarColor,
                                    backgroundColor: VarColor,
                                    pointRadius: 0,
                                    pointHoverRadius: 5,
                                    maxBarThickness: maxBarThickness
                                }

                                AllData = [...AllData, buffer]
                            })
                            break;
                        case GroupbyOptions1[2].value:
                            YaxisLabel = "Number of Batches"
                            Object.entries(byOrigin).forEach(value => {
                                inner_data = []
                                const byMonth = groupBy(value[1], d => moment(d.created_at).month())
                                Object.entries(byMonth).forEach(value => {
                                    inner_data = [...inner_data, { x: this.serializeDate(value[0]), y: value[1].length }]
                                });
                                const VarColor = this.randomizeBarColor()
                                buffer = {
                                    label: value[0],
                                    data: inner_data,
                                    fill: false,
                                    borderWidth: 1.5,
                                    borderColor: VarColor,
                                    backgroundColor: VarColor,
                                    pointRadius: 0,
                                    pointHoverRadius: 5,
                                    maxBarThickness: maxBarThickness
                                }
                                AllData = [...AllData, buffer]
                            })
                            break;
                    }
                    break;
                case GroupbyOptions3[4].value:
                    XaxisLabel = "Year"
                    AllData = []
                    timeData = Object.keys(byYear)
                    let FilterbyOrigin = groupBy(records, d => d.sap_origin);
                    switch (colOption) {
                        case GroupbyOptions1[0].value:
                            YaxisLabel = "Liters"
                            Object.entries(FilterbyOrigin).forEach(value => {
                                inner_data = []
                                let FilterbyMonth = groupBy(value[1], d => moment(d.created_at).year())
                                Object.entries(FilterbyMonth).forEach(value => {
                                    let sum = 0
                                    value[1].map(data => {
                                        sum = sum + parseFloat(data.output_volume)
                                    })
                                    inner_data = [...inner_data, { x: value[0], y: sum.toFixed(2) }]
                                })
                                let VarColor = this.randomizeBarColor()
                                let buffer = {
                                    label: value[0],
                                    data: inner_data,
                                    fill: false,
                                    borderWidth: 1.5,
                                    borderColor: VarColor,
                                    backgroundColor: VarColor,
                                    pointRadius: 0,
                                    pointHoverRadius: 5,
                                    maxBarThickness: maxBarThickness
                                }
                                AllData = [...AllData, buffer]
                            })
                            break;
                        case GroupbyOptions1[1].value:
                            YaxisLabel = "Liters"
                            Object.entries(FilterbyOrigin).forEach(value => {
                                inner_data = []
                                let FilterbyMonth = groupBy(value[1], d => moment(d.created_at).year())
                                Object.entries(FilterbyMonth).forEach(value => {
                                    let sum = 0
                                    value[1].map(data => {
                                        sum = sum + parseFloat(data.sap_volume)
                                    })
                                    inner_data = [...inner_data, { x: value[0], y: sum.toFixed(2) }]
                                })
                                let VarColor = this.randomizeBarColor()
                                let buffer = {
                                    label: value[0],
                                    data: inner_data,
                                    fill: false,
                                    borderWidth: 1.5,
                                    borderColor: VarColor,
                                    backgroundColor: VarColor,
                                    pointRadius: 0,
                                    pointHoverRadius: 5,
                                    maxBarThickness: maxBarThickness
                                }
                                AllData = [...AllData, buffer]
                            })
                            break;
                        case GroupbyOptions1[2].value:
                            YaxisLabel = "Number of Batches"
                            Object.entries(FilterbyOrigin).forEach(value => {
                                inner_data = []
                                let FilterbyMonth = groupBy(value[1], d => moment(d.created_at).year())
                                Object.entries(FilterbyMonth).forEach(value => {
                                    inner_data = [...inner_data, { x: value[0], y: value[1].length }]
                                });
                                let VarColor = this.randomizeBarColor()
                                let buffer = {
                                    label: value[0],
                                    data: inner_data,
                                    fill: false,
                                    borderWidth: 1.5,
                                    borderColor: VarColor,
                                    backgroundColor: VarColor,
                                    pointRadius: 0,
                                    pointHoverRadius: 5,
                                    maxBarThickness: maxBarThickness
                                }
                                AllData = [...AllData, buffer]
                            })
                            break;
                    }
                    break;
            }
            var data = {
                labels: timeData,
                datasets: AllData
            }
            var options = {
                beginAtZero: true,
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    easing: 'easeOutExpo'
                },
                tooltips: {
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return data.datasets[tooltipItems[0].datasetIndex].data[tooltipItems[0].index].x;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        type: 'category',
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: XaxisLabel,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0
                        },
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: YaxisLabel
                        }
                    }],
                },
                legend: {
                    display: true,
                    position: 'bottom'
                },
            };
            return (
                <Fragment>
                    <div>
                        <Grid container spacing={1}>
                            <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Grid container justify="space-between">
                                    <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
                                        <Typography variant="h6" color="secondary">
                                            Overview Chart
                                        </Typography>
                                    </Grid>
                                    <Grid item xl={9} lg={9} md={9} sm={9} xs={12}>
                                        <Grid container className={classes.container}>
                                            <Grid item className={classes.bottompaper}>
                                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                                    <Grid item>
                                                        Filter:
                                                    </Grid>
                                                    <Grid item className={classes.bottompaper}>
                                                        <FormControl>
                                                            <Select
                                                                labelId="col-option"
                                                                inputProps={{ 'aria-label': 'Without label' }}
                                                                value={colOption}
                                                                onChange={this.handleColChange}
                                                            >
                                                                {GroupbyOptions1.map((element, index) =>
                                                                    <MenuItem key={index} value={element.value}>{element.name}</MenuItem>
                                                                )}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item className={classes.bottompaper}>
                                                {XaxisLabel === "Year" ? null : (
                                                    <Grid container direction="row" justify="flex-start" alignItems="center">
                                                        <Grid item>
                                                            Year:
                                                        </Grid>
                                                        <Grid item className={classes.bottompaper}>
                                                            <FormControl>
                                                                <Select
                                                                    labelId="year-option"
                                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                                    value={yearValue}
                                                                    onChange={this.handleAllYears}
                                                                >
                                                                    {Allyears.map((element, index) =>
                                                                        <MenuItem key={index} value={element}>{element}</MenuItem>
                                                                    )}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                )}
                                            </Grid>
                                            <Grid item className={classes.bottompaper}>
                                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                                    <Grid item>
                                                        Group by:
                                                    </Grid>
                                                    <Grid item className={classes.bottompaper}>
                                                        <FormControl>
                                                            <Select
                                                                labelId="sample-size"
                                                                inputProps={{ 'aria-label': 'Without label' }}
                                                                value={groupOption}
                                                                onChange={this.handleGroupChange}
                                                            >
                                                                {GroupbyOptions3.map((element, index) =>
                                                                    <MenuItem key={index} value={element.value}>{element.name}</MenuItem>
                                                                )}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chart}>
                                <Container component="main" maxWidth="md">
                                    <div style={{ height: 250, marginBottom: 10 }}>
                                        <Bar data={data} options={options} ref={(reference) => this.lineReference = reference} />
                                    </div>
                                </Container>
                            </Grid>
                        </Grid>
                    </div>
                </Fragment>
            )
        }

    }
}

const mapStateToProps = state => ({
    records: state.records.records,
})

export default connect(mapStateToProps, {})(withStyles(styles)(RecordsOverview3))