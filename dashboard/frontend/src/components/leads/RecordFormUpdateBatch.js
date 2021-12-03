import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import PropTypes, { object } from "prop-types";
import { updateRecord } from "../../actions/functions";
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import { color1 } from '../constants/colors'
import { CONDENSER_TOPIC } from '../constants/topics'

//picker
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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


export class RecordFormUpdateBatch extends Component {
  state = {
    sap_brix: undefined,
    sap_volume: undefined,
    sap_origin: undefined,
    sap_fermentation: undefined,
    sap_date_collected: undefined,
    sap_remarks: undefined,
    output_volume: undefined,
  };

  static propTypes = {
    updateData: PropTypes.object.isRequired,
    updateRecord: PropTypes.func.isRequired,
    cancel: PropTypes.func
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onDateChange = e => this.setState({ sap_date_collected: e})

  onSubmit = e => {
    e.preventDefault();
    this.props.updateRecord(this.state, this.props.updateData.recordID)
    this.setState({
      sap_brix: undefined,
      sap_volume: undefined,
      sap_origin: undefined,
      sap_fermentation: undefined,
      sap_date_collected: undefined,
      sap_remarks: undefined,
      output_volume: undefined,
    });
  };

  componentDidMount() {
    this.setState({
      sap_brix: this.props.updateData.sap_brix,
      sap_volume: this.props.updateData.sap_volume,
      sap_origin: this.props.updateData.sap_origin,
      sap_fermentation: this.props.updateData.sap_fermentation,
      sap_date_collected: this.props.updateData.sap_date_collected,
      sap_remarks: this.props.updateData.sap_remarks,
      output_volume: this.props.updateData.output_volume,
    });
  }
  render() {

    const {
      sap_brix,
      sap_volume,
      sap_origin,
      sap_fermentation,
      sap_date_collected,
      sap_remarks,
      output_volume
    } = this.state;

    const { classes } = this.props;
    return (
      <form onSubmit={this.onSubmit} className={classes.root}>
        <div className={classes.root2} key="distillers-menu">
          <FormControl fullWidth variant="outlined">
            <TextField
              className={classes.margin}
              label="Batch Description"
              placeholder="#"
              multiline
              variant="outlined"
              name="sap_remarks"
              onChange={this.onChange}
              value={sap_remarks}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <TextField
              className={classes.margin}
              label="Brix"
              placeholder="#"
              type="number"
              variant="outlined"
              name="sap_brix"
              onChange={this.onChange}
              value={sap_brix}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <TextField
              className={classes.margin}
              label="Ethanol Output"
              placeholder="Liter"
              type="number"
              variant="outlined"
              name="output_volume"
              onChange={this.onChange}
              value={output_volume}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <TextField
              className={classes.margin}
              label="Volume"
              placeholder="Liter"
              type="number"
              variant="outlined"
              name="sap_volume"
              onChange={this.onChange}
              value={sap_volume}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <TextField
              className={classes.margin}
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
              className={classes.margin}
              label="Duration of Fermentation"
              placeholder="Hrs"
              type="number"
              variant="outlined"
              name="sap_fermentation"
              onChange={this.onChange}
              value={sap_fermentation}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  className={classes.margin}
                  variant="inline"
                  id="date-picker-dialog"
                  inputVariant="outlined"
                  label="Date Collected"
                  format="MM/dd/yyyy"
                  InputAdornmentProps={{ position: "start" }}
                  value={sap_date_collected}
                  name="sap_date_collected"
                  onChange={this.onDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
          </FormControl>
        </div>
        <div className="form-group float-right">
          <Button type="button" variant="outlined" color="primary" type="submit">
            Update
          </Button>
        </div>
      </form >
    );

  }

}

const mapStateToProps = state => ({
  distillers: state.records.distillers
})

export default connect(mapStateToProps, { updateRecord })(withStyles(styles)(RecordFormUpdateBatch))
