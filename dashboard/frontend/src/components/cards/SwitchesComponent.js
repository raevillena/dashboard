import React, { Component } from 'react'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import SvgIcon from '@material-ui/core/SvgIcon';
import { color1, appbarColor } from '../constants/colors'

//import default setting
import { switchOption, autoswitchOption } from '../constants/settings'

//import switches component
import SwitchesSingle from '../leads/SwitchesSingle'
import SwitchesMultiple from '../leads/SwitchesMultiple'

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
  button:{
    padding:theme.spacing(0.5)
  }
});

export class SwitchesComponent extends Component {
  state = {
    auto: autoswitchOption,
    single: switchOption
  }

  handleChange = (name) => event => {
    this.setState({ [name]: event.target.checked })
  }

  render() {

    const { auto, single } = this.state
    return (
      <MuiThemeProvider theme={theme}>
        <div className="d-flex justify-content-between" style={{ marginBottom: 10 }}>
          <Typography gutterBottom component="h6" color="secondary"><SvgIcon><path d={mdiTune} /></SvgIcon>Heater Control</Typography>
          <div>
            <div className="float-right" style={{padding:'3px'}}>
              {!auto && single ? ' Single ' : null}{!auto && !single ? ' Multiple ' : null}
              {!auto ? <CustomSwitch checked={this.state.single} onChange={this.handleChange('single')} /> : null}
            </div>
            <div className="float-right" style={{padding:'3px'}}>
              {'  Auto '} <CustomSwitch checked={this.state.auto} onChange={this.handleChange('auto')} />
            </div> 
          </div>
        </div>
        {auto ? <SwitchesSingle disable={true} /> : null}
        {!auto && single ? <SwitchesSingle /> : null}
        {!auto && !single ? <SwitchesMultiple /> : null}
      </MuiThemeProvider>
    )
  }
}


export default (withStyles(styles)(SwitchesComponent))
