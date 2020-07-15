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
import { GroupbyOptions } from '../constants/integers'
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

export class RecordsBarChart extends Component {
    static propTypes = {
        records: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired,
    };

    state = {
        groupOption: GroupbyOptions[0].value,
    }

    handleGroupChange = (event) => {
        this.setState({ groupOption: event.target.value })
    }

    render() {
        const { records, classes } = this.props
        const { groupOption } = this.state
        let timeData = []
        let valuables = []
        switch (groupOption) {
            case GroupbyOptions[0].value:
                const today = filter(records, d => moment(d.created_at).isSame(moment(), 'day'));
                today.map(data => {
                    timeData = [...timeData, moment(data.created_at).format('MM-DD-YYYY')]
                    valuables = [...valuables, parseFloat(data.output_volume)]
                })
                break;
            case GroupbyOptions[1].value:
                const thisWeek = filter(records, d => moment(d.created_at).isSame(moment(), 'week'));
                thisWeek.map(data => {
                    timeData = [...timeData, moment(data.created_at).format('MM-DD-YYYY')]
                    valuables = [...valuables, parseFloat(data.output_volume)]
                })
                break;
            case GroupbyOptions[2].value:
                const thisMonth = filter(records, d => moment(d.created_at).isSame(moment(), 'month'));
                thisMonth.map(data => {
                    timeData = [...timeData, moment(data.created_at).format('MM-DD-YYYY')]
                    valuables = [...valuables, parseFloat(data.output_volume)]
                })
                break;
            case GroupbyOptions[3].value:
                const byMonth = groupBy(records, d => moment(d.created_at).month());
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
                    let sum = 0
                    value.map(data => {
                        sum = sum + parseFloat(data.output_volume)
                    })
                    valuables = [...valuables, sum]
                });
                break;
            case GroupbyOptions[4].value:
                const byYear = groupBy(records, d => moment(d.created_at).year());
                timeData = Object.keys(byYear)
                Object.values(byYear).forEach(value => {
                    let sum = 0
                    value.map(data => {
                        sum = sum + parseFloat(data.output_volume)
                    })
                    valuables = [...valuables, sum]
                });
                break;
        }

        var data = {
            labels: timeData,//['8 am', '9 am', '10 am', '11 am', '12 am', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm'],//[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            datasets: [
                {
                    label: "Liters",
                    data: valuables,//[200, 333, 212, 123, 132, 244, 234, 111, 222, 213],//[{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }],
                    fill: false,
                    borderWidth: 1.5,
                    borderColor: 'rgba(32, 232, 119, 1)',
                    backgroundColor: 'rgba(32, 232, 119, 1)',
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    maxBarThickness: maxBarThickness
                },
            ]
        };

        var options = {
            beginAtZero: true,
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
                yAxes: [{
                    ticks: {
                        min: 0
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
                                        {GroupbyOptions.map((element, index) =>
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

export default connect(mapStateToProps, {})(withStyles(styles)(RecordsBarChart))