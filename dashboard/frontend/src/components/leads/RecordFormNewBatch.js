import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import PropTypes, { object } from "prop-types";
import { addRecord } from "../../actions/functions";
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import { color1 } from '../constants/colors'
import { CONDENSER_TOPIC } from '../constants/topics'

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
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minwidth: 300,
    },
  },
  root2: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginBottom: theme.spacing(3),
  },
  textField: {
    width: 200,
  },

};


export class RecordFormNewBatch extends Component {
  state = {
    sap_brix: "",
    sap_volume: "",
    sap_origin: "",
    sap_fermentation: "",
    sap_date_collected: "",
  };

  static propTypes = {
    addRecord: PropTypes.func.isRequired,
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { sap_brix, sap_volume, sap_origin, sap_fermentation, sap_date_collected, distiller } = this.state
    this.props.addRecord(CONDENSER_TOPIC, sap_brix, sap_volume, sap_origin, sap_fermentation, sap_date_collected)
    this.setState({
      sap_brix: "",
      sap_volume: "",
      sap_origin: "",
      sap_fermentation: "",
      sap_date_collected: ""
    });
  };


  render() {
    const {
      sap_brix,
      sap_volume,
      sap_origin,
      sap_fermentation,
      sap_date_collected,
    } = this.state;

    const { classes } = this.props;
    const dis = this.props.distillers
    return (
      <form onSubmit={this.onSubmit} className={classes.root}>
        <div className={classes.root2} key="distillers-menu">
          <FormControl fullWidth variant="outlined">
            <TextField
              className={classes.margin}
              label="Brix"
              placeholder="#"
              multiline
              variant="outlined"
              name="sap_brix"
              onChange={this.onChange}
              value={sap_brix}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Volume"
              placeholder="Liter"
              multiline
              variant="outlined"
              name="sap_volume"
              onChange={this.onChange}
              value={sap_volume}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Place of Origin"
              placeholder="Brgy/Municipality/City"
              multiline
              variant="outlined"
              name="sap_origin"
              onChange={this.onChange}
              value={sap_origin}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Duration of Fermentation"
              placeholder="Hrs"
              multiline
              variant="outlined"
              name="sap_fermentation"
              onChange={this.onChange}
              value={sap_fermentation}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Date Collected"
              placeholder="mm/dd/yyyy"
              multiline
              variant="outlined"
              name="sap_date_collected"
              onChange={this.onChange}
              value={sap_date_collected}
            />
          </FormControl>
        </div>
        <div className="form-group float-right">
          <Button type="button" variant="outlined" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form >
    );

  }

}

const mapStateToProps = state => ({
  distillers: state.records.distillers
})

export default connect(mapStateToProps, { addRecord })(withStyles(styles)(RecordFormNewBatch))
