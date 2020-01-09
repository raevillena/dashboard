import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ViewListIcon from '@material-ui/icons/ViewList';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    progress: {
        margin: theme.spacing(2),
    },
};

export class SimpleCardClient extends Component {

    componentDidMount() {
        console.log('Client did mount')
    }
    render() {
        const { classes } = this.props;
        const clientConnected = (
            <h5 className="text-right">{'Connected'}</h5>
        )
        const clientDisconnected = (
            <h5 className="text-right">{<CircularProgress className={classes.progress} size={18} color="secondary" />}</h5>
        )
        return (

            <MuiThemeProvider theme={theme}>
                <div>
                    <Typography gutterBottom variant="h5" component="h2" color="secondary">
                        <ViewListIcon />MQTT Client
                        </Typography>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="text-left text-muted align-middle">Status</h5>
                        </div>
                        <div className="col-6">
                            {this.props.isConnected ? clientConnected : clientDisconnected}
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

SimpleCardClient.propTypes = {
    isConnected: PropTypes.bool,
};
const mapStateToProps = state => ({
    isConnected: state.client.isConnected
})

export default connect(mapStateToProps, {})(withStyles(styles)(SimpleCardClient))