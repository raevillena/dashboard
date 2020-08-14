import React, { Component } from 'react'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import SvgIcon from '@material-ui/core/SvgIcon';
import { color1, appbarColor } from '../constants/colors'

//import default setting
import { switchOption } from '../constants/settings'

//import switches component
import Pump from '../leads/Pump'

//import icon js
import { mdiTune } from '@mdi/js';

//import CustomSwitch from '../layout/CustomSwitch'
import { CustomSwitch } from '../layout/CustomSwitch'

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

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',

  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export class PumpComponent extends Component {

  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <div className="d-flex justify-content-between" style={{ marginBottom: 15 }}>
          <Typography gutterBottom component="h6" color="secondary"><SvgIcon><path d={mdiTune} /></SvgIcon>Pump Control</Typography>
        </div>
        <Pump /> 
      </MuiThemeProvider>
    )
  }
}


export default (withStyles(styles)(PumpComponent))
