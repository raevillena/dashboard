import React, { Component, Fragment } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Bar } from 'react-chartjs-2'
import PropTypes from "prop-types"
import { connect } from "react-redux"
//import { getCondenserData } from "../../actions/functions";
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import { groupBy, filter } from 'lodash-es'
import moment from 'moment';
moment().format();

//material ui imports
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

//constants imports
import { ChartColor1, ChartColor2, color1 } from '../constants/colors'
import { GroupbyOptions3 } from '../constants/integers'
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
        padding: theme.spacing(0.5),
        height: '100%',
    },
    chart: {
        marginBottom: theme.spacing(3),
        height: '100%',

    },
});

export class RecordsOverview3 extends Component {
    static propTypes = {
        records: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired,
    };

    state = {
        groupOption: GroupbyOptions3[0].value,
    }

    handleGroupChange = (event) => {
        this.setState({ groupOption: event.target.value })
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

    render() {
        const { records, classes } = this.props
        const { groupOption } = this.state
        let timeData = []
        let valuables = []
        let axisLabel = ""
        let AllData = []

        switch (groupOption) {
            case GroupbyOptions3[0].value:
                const today = filter(records, d => moment(d.created_at).isSame(moment(), 'day'))
                axisLabel = "Day"
                today.map(data => {
                    timeData = [...timeData, moment(data.created_at).format('MM-DD-YYYY')]
                    valuables = [...valuables, parseFloat(data.output_volume)]
                })
                break;
            case GroupbyOptions3[1].value:
                const thisWeek = filter(records, d => moment(d.created_at).isSame(moment(), 'week'))
                axisLabel = "Day"
                thisWeek.map(data => {
                    timeData = [...timeData, moment(data.created_at).format('MM-DD-YYYY')]
                    valuables = [...valuables, parseFloat(data.output_volume)]
                })
                break;
            case GroupbyOptions3[2].value:
                const thisMonth = filter(records, d => moment(d.created_at).isSame(moment(), 'month'))
                axisLabel = "Day"
                thisMonth.map(data => {
                    timeData = [...timeData, moment(data.created_at).format('MM-DD-YYYY')]
                    valuables = [...valuables, parseFloat(data.output_volume)]
                })
                break;
            case GroupbyOptions3[3].value:
                AllData = []
                console.log(records)
                const whatmon = groupBy(records, d => moment(d.created_at).month())
                Object.keys(whatmon).forEach(key => {
                    switch (key) {
                        case '0':
                            timeData = [...timeData, "Jan"]
                            break;
                        case '1':
                            timeData = [...timeData, "Feb"]
                            break;
                        case '2':
                            timeData = [...timeData, "Mar"]
                            break;
                        case '3':
                            timeData = [...timeData, "Apr"]
                            break;
                        case '4':
                            timeData = [...timeData, "May"]
                            break;
                        case '5':
                            timeData = [...timeData, "Jun"]
                            break;
                        case '6':
                            timeData = [...timeData, "Jul"]
                            break;
                        case '7':
                            timeData = [...timeData, "Aug"]
                            break;
                        case '8':
                            timeData = [...timeData, "Sep"]
                            break;
                        case '9':
                            timeData = [...timeData, "Oct"]
                            break;
                        case '10':
                            timeData = [...timeData, "Nov"]
                            break;
                        case '11':
                            timeData = [...timeData, "Dec"]
                            break;
                    }
                })
                const byOrigin = groupBy(records, d => d.sap_origin);
                console.log(byOrigin)
                axisLabel = "Month"
                Object.entries(byOrigin).forEach(value => {
                    let inner_data = []
                    const byMonth = groupBy(value[1], d => moment(d.created_at).month())
                    Object.entries(byMonth).forEach(value => {
                        let sum = 0
                        value[1].map(data => {
                            sum = sum + parseFloat(data.output_volume)
                        })
                        inner_data = [...inner_data, { x: this.serializeDate(value[0]), y: sum }]
                    })
                    const VarColor = this.randomizeBarColor()
                    const buffer = {
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
            case GroupbyOptions3[4].value:
                let whatYear = groupBy(records, d => moment(d.created_at).year())
                console.log(records)
                axisLabel = "Year"
                AllData = []
                timeData = Object.keys(whatYear)
                let FilterbyOrigin = groupBy(records, d => d.sap_origin);
                console.log("Filter by origin", FilterbyOrigin)
                Object.entries(FilterbyOrigin).forEach(value => {
                    let inner_data = []
                    let FilterbyMonth = groupBy(value[1], d => moment(d.created_at).year())
                    console.log("        Filtered by year", FilterbyMonth)
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
        }
        console.log(AllData)

        if (axisLabel == "Month" || "Year") {
            var data = {
                labels: timeData,
                datasets: AllData
            }
        }
        else {
            var data = {
                labels: timeData,
                datasets: [
                    {
                        label: "Collected Ethanol",
                        data: valuables,//[200, 333, 212, 123, 132, 244, 234, 111, 222, 213],
                        fill: false,
                        borderWidth: 1.5,
                        borderColor: 'rgba(32, 232, 119, 1)',
                        backgroundColor: 'rgba(32, 232, 119, 1)',
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        maxBarThickness: maxBarThickness
                    },
                ],
            }
        };

        var options = {
            beginAtZero: true,
            responsive: true,
            maintainAspectRatio: false,
            //animation: false,
            animation: {
                easing: 'easeOutExpo'
            },

            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: axisLabel
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Liters'
                    }
                }],
            },
        };

        return (
            <Fragment>
                <div>
                    <div className=" float-right">
                        <Grid container direction="row" justify="flex-start" alignItems="center">
                            <Grid item className={classes.bottompaper}>
                                Filter:
                            </Grid>
                            <Grid item className={classes.bottompaper}>
                                <FormControl>
                                    <Select
                                        labelId="sample-size"
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        value={this.state.groupOption}
                                        onChange={this.handleGroupChange}
                                    >
                                        {GroupbyOptions3.map((element, index) =>
                                            <MenuItem key={index} value={element.value}>{element.name}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                    <Container component="main" maxWidth="md">
                        <div style={{ height: 250, marginBottom: 10 }}>
                            <Bar data={data} options={options} ref={(reference) => this.lineReference = reference} />
                        </div>
                    </Container>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    records: state.records.records,
})

export default connect(mapStateToProps, {})(withStyles(styles)(RecordsOverview3))

/*
case GroupbyOptions3[3].value:
const byMonth = groupBy(records, d => moment(d.created_at).month());
console.log("byMonth array", byMonth)
axisLabel = "Month"
Object.keys(byMonth).forEach(key => {
    switch (key) {
        case '0':
            timeData = [...timeData, "Jan"]
            break;
        case '1':
            timeData = [...timeData, "Feb"]
            break;
        case '2':
            timeData = [...timeData, "Mar"]
            break;
        case '3':
            timeData = [...timeData, "Apr"]
            break;
        case '4':
            timeData = [...timeData, "May"]
            break;
        case '5':
            timeData = [...timeData, "Jun"]
            break;
        case '6':
            timeData = [...timeData, "Jul"]
            break;
        case '7':
            timeData = [...timeData, "Aug"]
            break;
        case '8':
            timeData = [...timeData, "Sep"]
            break;
        case '9':
            timeData = [...timeData, "Oct"]
            break;
        case '10':
            timeData = [...timeData, "Nov"]
            break;
        case '11':
            timeData = [...timeData, "Dec"]
            break;
    }
})
Object.values(byMonth).forEach(value => {
    const byVolume = groupBy(value, d => d.sap_origin);
    console.log("sorted by origin", byVolume)
});
break;

*/