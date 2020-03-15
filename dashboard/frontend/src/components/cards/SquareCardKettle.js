import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import WavesIcon from '@material-ui/icons/Waves';
import { color1 } from '../constants/colors'
import { green } from '@material-ui/core/colors';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiThermometerLines } from '@mdi/js';

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

export class SquareCardKettle extends Component {


    render() {
        const kettle = this.props.kettle
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Typography gutterBottom component="h6" color="secondary">
                        <SvgIcon><path d={mdiThermometerLines} /></SvgIcon>Kettle
                    </Typography>
                    <Typography gutterBottom variant="h3" color="primary">
                        {`${kettle}°C`}
                    </Typography>
                </div>
            </MuiThemeProvider>
        );
    }
}

SquareCardKettle.propTypes = {
    kettle: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    kettle: state.payload.kettle
})


export default connect(mapStateToProps, {})(withStyles(styles)(SquareCardKettle))