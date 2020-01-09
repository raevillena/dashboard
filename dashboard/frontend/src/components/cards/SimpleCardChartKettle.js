import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ChartKettle from '../leads/ChartKettle';
import BarChartIcon from '@material-ui/icons/BarChart';
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
        maxWidth: 500,
        marginRight: '15px',
        marginBottom: '15px',
        boxShadow: '3px 4px 16px -8px rgba(0,0,0,0.75)'
    },
    title: {
        paddingRight: '415px'
    },
    pos: {
        marginBottom: 12,
    },
};



export class SimpleCardChartKettle extends Component {

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Card className={classes.card} >
                        <CardContent>
                            <Typography color="secondary" gutterBottom variant="h5" component="h2">
                                <BarChartIcon />Kettle Temperature °C
                            </Typography>
                            <Typography className={classes.title}></Typography>
                        </CardContent>
                        <ChartKettle />
                    </Card>
                </div>
            </MuiThemeProvider>
        )
    }
}


SimpleCardChartKettle.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCardChartKettle);