import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import SimpleCardClient from './SimpleCardClient'

import ChartComponent from '../leads/ChartComponent'
import { color1 } from '../constants/colors'

import SquareCardCondenser from './SquareCardCondenser'
import SquareCardKettle from './SquareCardKettle'
import SquareCardHeater from './SquareCardHeater'
import SquareCardPump from './SquareCardPump'

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import SwitchesComponent from './SwitchesComponent';
import PumpComponent from './PumpComponent';
import ConsumptionComponent from './ConsumptionComponent'

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

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

function DashboardGrid(props) {
    const { classes } = props;

    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" href="/" onClick={handleClick}>
                                Dashboard
                            </Link>
                            <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                                Core
                            </Link>
                            <Typography color="textPrimary">Monitor</Typography>
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                                <Paper className={classes.paper}>
                                                    <SquareCardCondenser />
                                                </Paper>
                                            </Grid>
                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                                <Paper className={classes.paper}>
                                                    <SquareCardKettle />
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                                <Paper className={classes.paper}>
                                                    <SquareCardHeater />
                                                </Paper>
                                            </Grid>
                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                                <Paper className={classes.paper}>
                                                    <SquareCardPump />
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <Paper className={classes.paper}>
                                            <SimpleCardClient />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                                <Paper className={classes.paper}>
                                    <ChartComponent />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xl={10} lg={10} md={10} sm={9} xs={12}>
                                <Paper className={classes.paper}>
                                    <SwitchesComponent />
                                </Paper>
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={3} xs={12}>
                                <Paper className={classes.paper}>
                                    <PumpComponent />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/*<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Paper className={classes.paper}>
                            <ConsumptionComponent />
                        </Paper>
                    </Grid>*/}
                </Grid>
            </div>
        </MuiThemeProvider>
    );
}

DashboardGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardGrid);