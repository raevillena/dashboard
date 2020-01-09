import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GaugeMeterHeater from '../leads/GaugeMeterHeater'
import WavesIcon from '@material-ui/icons/Waves';

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

const styles = {
    card: {
        minWidth: 250,
        maxWidth: 300,
        minHeight: 250,
        maxHeight: 250,
        marginRight: '15px',
        marginBottom: '15px',
        boxShadow: '3px 4px 16px -8px rgba(0,0,0,0.75)'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

function SimpleCardGaugeHeater(props) {

    const { classes } = props
    return (
        <MuiThemeProvider theme={theme}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" color="secondary">
                        <WavesIcon /> Heater Meter
                    </Typography>
                    <Typography className={classes.title} ></Typography>

                </CardContent>
                <GaugeMeterHeater />
            </Card>
        </MuiThemeProvider>
    );
}

SimpleCardGaugeHeater.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SimpleCardGaugeHeater)

