import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import BarChartIcon from '@material-ui/icons/BarChart'

import SimpleCardClient from './SimpleCardClient'
import SimpleCardOverview from './SimpleCardOverview'
import ModalViewSap from './ModalViewSap'
import SimpleCardProgressOverview from './SimpleCardProgressOverview'

import ChartComponent from '../leads/ChartComponent'

import SimpleCardGaugeHeater from './SimpleCardGaugeHeater'
import GaugeMeterHeater from '../leads/GaugeMeterHeater'
import GaugeMeterPump from '../leads/GaugeMeterPump'

import { color1 } from '../constants/colors'

import ModalSetTemp from './ModalSetTemp'

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
});

function AutoGrid(props) {
    const { classes } = props;

    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Paper className={classes.paper}>
                                    <SimpleCardClient />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Paper className={classes.paper}>
                                    <SimpleCardOverview />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Paper className={classes.paper}>
                                    <SimpleCardProgressOverview />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Paper className={classes.paper}>
                                    <ModalViewSap />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xl lg md sm={12} xs={12}>
                                <Paper className={classes.paper}>
                                    <Typography gutterBottom variant="h5" component="h2" color="secondary">
                                        <BarChartIcon />Temperature Profile
                                    </Typography>
                                    <ChartComponent />
                                    <ModalSetTemp />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} >
                                <Paper className={classes.paper}>
                                    <Typography gutterBottom variant="h5" component="h2" color="secondary">
                                        <BarChartIcon />Heater
                                        <GaugeMeterHeater />
                                    </Typography>

                                </Paper>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Paper className={classes.paper}>
                                    <Typography gutterBottom variant="h5" component="h2" color="secondary">
                                        <BarChartIcon />Pump
                                    </Typography>
                                    <GaugeMeterPump />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </MuiThemeProvider>
    );
}

AutoGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoGrid);