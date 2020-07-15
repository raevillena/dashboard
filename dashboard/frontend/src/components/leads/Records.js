//react imports
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

//ui imports
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import SvgIcon from '@material-ui/core/SvgIcon';
//components to render
import RecordsBarChart from './RecordsBarChart'
import RecordsTable from './RecordsTable'
import { mdiPoll } from '@mdi/js';
import { color1 } from '../constants/colors'


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

function Records(props) {
    const { classes } = props;

    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div style={{ paddingTop: 20 }}>
                            <RecordsBarChart />
                        </div>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div style={{ paddingTop: 20 }}>
                            <RecordsTable />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </MuiThemeProvider>
    );
}

Records.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Records);
