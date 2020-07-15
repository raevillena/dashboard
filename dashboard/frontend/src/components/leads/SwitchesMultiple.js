import React, { Component } from 'react'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography'
import SvgIcon from '@material-ui/core/SvgIcon';
import { color1 } from '../constants/colors'
import { sendSwitches } from '../../actions/payload'
import { createMessage } from '../../actions/messages'
import { connect } from 'react-redux'
import {
    RELAY1_TX_TOPIC, RELAY2_TX_TOPIC, RELAY3_TX_TOPIC, RELAY4_TX_TOPIC, RELAY5_TX_TOPIC
} from '../constants/topics'

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {CustomSwitch} from '../layout/CustomSwitch'

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

export class SwitchesMultiple extends Component {

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
                name: "Heater 1", action: <CustomSwitch checked={this.props.relay.relay1}
                    onChange={this.handleChange('relay1', RELAY1_TX_TOPIC)} value="relay1" />,
                rating: '1.2kW', time: 7692024
            },
            {
                name: "Heater 2", action: <CustomSwitch checked={this.props.relay.relay2}
                    onChange={this.handleChange('relay2', RELAY2_TX_TOPIC)} value="relay2" />,
                rating: '1.2kW', time: 7692024
            },
            {
                name: "Heater 3", action: <CustomSwitch checked={this.props.relay.relay3}
                    onChange={this.handleChange('relay3', RELAY3_TX_TOPIC)} value="relay3" />,
                rating: '1.2kW', time: 7692024
            },
            {
                name: "Heater 4", action: <CustomSwitch checked={this.props.relay.relay4}
                    onChange={this.handleChange('relay4', RELAY4_TX_TOPIC)} value="relay4" />,
                rating: '1.2kW', time: 7692024
            },
            {
                name: "Heater 5", action: <CustomSwitch checked={this.props.relay.relay5}
                    onChange={this.handleChange('relay5', RELAY5_TX_TOPIC)} value="relay5" />,
                rating: '1.2kW', time: 7692024
            }
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

export default connect(mapStateToProps, { createMessage, sendSwitches })(withStyles(styles)(SwitchesMultiple))
