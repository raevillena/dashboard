import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ViewListIcon from '@material-ui/icons/ViewList';
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



export class SimpleCardOverview extends Component {

    render() {

        const { condenser, kettle, pump, heater } = this.props.payload;


        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Typography gutterBottom variant="h5" component="h2" color="secondary">
                        <ViewListIcon />Distiller Parameters
                </Typography>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="text-left text-muted">Condenser</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="text-right">{`${condenser}°C`}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="text-left text-muted">Kettle</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="text-right">{`${kettle}°C`}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="text-left text-muted">Pump</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="text-right">{`${pump}%`}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="text-left text-muted">Heater</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="text-right">{`${heater}%`}</h5>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

SimpleCardOverview.propTypes = {
    payload: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    payload: state.payload
})


export default connect(mapStateToProps, {})(SimpleCardOverview)