import React, { Component } from 'react'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch';
import { sendSwitches } from '../../actions/payload'
import { createMessage } from '../../actions/messages'
import { connect } from 'react-redux'
import {
  RELAY1TT, RELAY2TT, RELAY3TT, RELAY4TT, RELAY5TT, RELAY6TT
} from '../constants/topics'

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//switch
const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(0),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

//tables
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 100, align: 'center' },
  {
    id: 'rating',
    label: 'Rating',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'time',
    label: 'On-Time',
    minWidth: 170,
    align: 'center',
  },
];

function createData(name, code, population, size) {
  return { name, code, population, size };
}



const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
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

export class SwitchesComponent extends Component {

  static propTypes = {
    relay: PropTypes.object.isRequired,
  }
  handleChange = (name, topic) => event => {
    this.setState({ [name]: event.target.checked })
    this.props.sendSwitches(topic, event.target.checked)
    this.props.createMessage({ sendMqttMessage: `Setting changed` })
  }
  render() {

    const rows = [
      {
        name: "Heater 1", action: <IOSSwitch checked={this.props.relay.relay1}
          onChange={this.handleChange('relay1', RELAY1TT)} value="relay1" />,
        rating: '1.2kW', time: 7692024
      },
      {
        name: "Heater 2", action: <IOSSwitch checked={this.props.relay.relay2}
          onChange={this.handleChange('relay2', RELAY2TT)} value="relay2" />,
        rating: '1.2kW', time: 7692024
      },
      {
        name: "Heater 3", action: <IOSSwitch checked={this.props.relay.relay3}
          onChange={this.handleChange('relay3', RELAY3TT)} value="relay3" />,
        rating: '1.2kW', time: 7692024
      },
      {
        name: "Heater 4", action: <IOSSwitch checked={this.props.relay.relay4}
          onChange={this.handleChange('relay4', RELAY4TT)} value="relay4" />,
        rating: '1.2kW', time: 7692024
      },
      {
        name: "Heater 5", action: <IOSSwitch checked={this.props.relay.relay5}
          onChange={this.handleChange('relay5', RELAY5TT)} value="relay5" />,
        rating: '1.2kW', time: 7692024
      },
      {
        name: "Pump", action: <IOSSwitch checked={this.props.relay.relay6}
          onChange={this.handleChange('relay6', RELAY6TT)} value="relay6" />,
        rating: '2kW', time: 7692024
      },
    ];

    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="center">{row.action}</TableCell>
                  <TableCell align="center">{row.rating}</TableCell>
                  <TableCell align="center">{row.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  relay: state.relay
})

export default connect(mapStateToProps, { createMessage, sendSwitches })(withStyles(styles)(SwitchesComponent))
