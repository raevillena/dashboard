import React, { Component, Fragment } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Doughnut } from 'react-chartjs-2'
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
import Typography from '@material-ui/core/Typography';

//constants imports
import { ChartColor1, ChartColor2, color1 } from '../constants/colors'
import { GroupbyOptions1 } from '../constants/integers'
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

export class RecordsOverview1 extends Component {
    static propTypes = {
        records: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired,
    };

    state = {
        groupOption: GroupbyOptions1[0].value,
    }

    handleGroupChange = (event) => {
        this.setState({ groupOption: event.target.value })
    }

    render() {
        const { records, classes } = this.props
        const { groupOption } = this.state
        let timeData = []
        let valuables = []
        let axisLabel = ""
        switch (groupOption) {
            case GroupbyOptions1[0].value:
                const byCount = groupBy(records, d => d.sap_origin);
                timeData = Object.keys(byCount)
                Object.values(byCount).forEach(value => {
                    valuables = [...valuables, value.length]
                });
                break;
            case GroupbyOptions1[1].value:
                const byVolume = groupBy(records, d => d.sap_origin);
                timeData = Object.keys(byVolume)
                Object.values(byVolume).forEach(value => {
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
                    label: "Collected Ethanol",
                    data: valuables,
                    borderColor: ['rgba(32, 232, 119, 1)',
                        'rgba(56, 94, 218, 1)',
                        'rgba(226, 74, 74, 1)',
                        'rgba(226, 155, 74, 1)',
                        'rgba(4, 138, 10, 1)',
                        'rgba(125, 71, 218, 1)',
                        'rgba(122, 217, 26, 1)',
                    ],
                    backgroundColor: ['rgba(32, 232, 119, 1)',
                        'rgba(56, 94, 218, 1)',
                        'rgba(226, 74, 74, 1)',
                        'rgba(226, 155, 74, 1)',
                        'rgba(4, 138, 10, 1)',
                        'rgba(125, 71, 218, 1)',
                        'rgba(122, 217, 26, 1)',
                    ],
                },
            ]
        };

        var options = {
            beginAtZero: true,
            responsive: true,
            maintainAspectRatio: false,
            //animation: false,
            animation: {
                easing: 'easeOutExpo'
            },
        };

        return (
            <Fragment>
                <div>
                    <div className=" float-left">
                        <Grid container direction="row" justify="flex-start" alignItems="center">
                            <Typography component="h6" color="secondary">
                                Productivity Overview
                            </Typography>
                        </Grid>
                    </div>
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
                                        {GroupbyOptions1.map((element, index) =>
                                            <MenuItem key={index} value={element.value}>{element.name}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                    <Container component="main" maxWidth="md">
                        <div style={{ height: 250, marginBottom: 10 }}>
                            <Doughnut data={data} options={options} />
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

export default connect(mapStateToProps, {})(withStyles(styles)(RecordsOverview1))