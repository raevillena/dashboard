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



export class SimpleCardProgressOverview extends Component {

    render() {

        const { status, progress, volume } = this.props.records;

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Typography gutterBottom variant="h5" component="h2" color="secondary">
                        <ViewListIcon />Progress Status
                </Typography>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="text-left text-muted">Status</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="text-right">{`${status}`}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="text-left text-muted">Progress</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="text-right">{`${progress}%`}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="text-left text-muted">Volume Collected</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="text-right">{`${volume}L`}</h5>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

SimpleCardProgressOverview.propTypes = {
    records: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    records: state.records,
})


export default connect(mapStateToProps, {})(SimpleCardProgressOverview)