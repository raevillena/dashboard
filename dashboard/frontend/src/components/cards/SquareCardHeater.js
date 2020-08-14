import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import WavesIcon from '@material-ui/icons/Waves';
import { color1, blackTextColor2 } from '../constants/colors'
import { green } from '@material-ui/core/colors';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiRadiator } from '@mdi/js';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        secondary: {
            main: color1,
        },
        textSecondary: {
            main: blackTextColor2,
        },
    },
});

const styles = {
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    typography: {
        body1: {

        }
    },
};

theme.typography.h3 = {
    [theme.breakpoints.down(150)]: {
        fontSize: '2rem',
    },
    [theme.breakpoints.between(151, 300)]: {
        fontSize: '2.2rem',
    },
    [theme.breakpoints.between(301, 350)]: {
        fontSize: '2.4rem',
    },
    [theme.breakpoints.between(351, 390)]: {
        fontSize: '2.6rem',
    },
    [theme.breakpoints.between(391, 450)]: {
        fontSize: '2.8rem',
    },
    [theme.breakpoints.between(451, 'sm')]: {
        fontSize: '3.4rem',
    },
    [theme.breakpoints.between('sm', 750)]: {
        fontSize: '5.2rem',
    },
    [theme.breakpoints.between(751, 'md')]: {
        fontSize: '6rem',
    },
    [theme.breakpoints.between('md', 1100)]: {
        fontSize: '2rem',
    },
    [theme.breakpoints.between(1101, 'lg')]: {
        fontSize: '2.5rem',
    },
    [theme.breakpoints.between('lg', 1350)]: {
        fontSize: '3rem',
    },
    [theme.breakpoints.between(1351, 1439)]: {
        fontSize: '3.3rem',
    },
    [theme.breakpoints.between(1440, 'xl')]: {
        fontSize: '3.6rem',
    },
    [theme.breakpoints.up('xl')]: {
        fontSize: '6rem',
    },
};

export class SquareCardHeater extends Component {


    render() {
        const heater = this.props.heater
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Typography gutterBottom component="h6" color="secondary">
                        <SvgIcon><path d={mdiRadiator} /></SvgIcon> Heater Power
                    </Typography>
                    <Typography gutterBottom variant="h3" color="textSecondary">
                        {`${heater * 100}%`}
                    </Typography>
                </div>
            </MuiThemeProvider>
        );
    }
}

SquareCardHeater.propTypes = {
    heater: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

const mapStateToProps = state => ({
    heater: state.payload.heater
})


export default connect(mapStateToProps, {})(withStyles(styles)(SquareCardHeater))