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



export class SimpleCardSapOverview extends Component {

    render() {

        const { brix, volume, origin, fermentation, date } = this.props.sap;


        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Typography gutterBottom variant="h5" component="h2" color="secondary">
                        <ViewListIcon />Sap Details
                </Typography>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="text-left text-muted">Brix</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="text-right">{`${brix}`}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="text-left text-muted">Volume</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="text-right">{`${volume}L`}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="text-left text-muted">Origin</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="text-right">{`${origin}`}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="text-left text-muted">Fermentation Duration</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="text-right">{`${fermentation, date}Hrs`}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="text-left text-muted">Date Collected</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="text-right">{`${date}`}</h5>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

SimpleCardSapOverview.propTypes = {
    sap: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    sap: state.sap
})


export default connect(mapStateToProps, {})(SimpleCardSapOverview)