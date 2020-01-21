import React, { Component, Fragment } from 'react'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { sendSwitches } from '../../actions/payload'
import { createMessage } from '../../actions/messages'
import { connect } from 'react-redux'
import {
    RELAY1TT, RELAY2TT, RELAY3TT, RELAY4TT, RELAY5TT, RELAY6TT
} from '../constants/topics'
import {
    RELAY1, RELAY2, RELAY3, RELAY4, RELAY5, RELAY6
} from '../../actions/types'

const IOSSwitch = withStyles(theme => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
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
});

export class SimpleCardSwitches extends Component {

    static propTypes = {
        relay: PropTypes.object.isRequired,
    }
    handleChange = (name, topic) => event => {
        this.setState({ [name]: event.target.checked })
        this.props.sendSwitches(topic, event.target.checked)
        this.props.createMessage({ sendMqttMessage: `Setting changed` })
    }
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.paper}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Manual Switches</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <IOSSwitch
                                        checked={this.props.relay.relay1}
                                        onChange={this.handleChange('relay1', RELAY1TT)}
                                        value="relay1"
                                    />
                                }
                                label="Heater 1"
                            />
                            <FormControlLabel
                                control={
                                    <IOSSwitch
                                        checked={this.props.relay.relay2}
                                        onChange={this.handleChange('relay2', RELAY2TT)}
                                        value="relay2"
                                    />
                                }
                                label="Heater 2"
                            />
                            <FormControlLabel
                                control={
                                    <IOSSwitch
                                        checked={this.props.relay.relay3}
                                        onChange={this.handleChange('relay3', RELAY3TT)}
                                        value="relay3"
                                    />
                                }
                                label="Heater 3"
                            />
                            <FormControlLabel
                                control={
                                    <IOSSwitch
                                        checked={this.props.relay.relay4}
                                        onChange={this.handleChange('relay4', RELAY4TT)}
                                        value="relay4"
                                    />
                                }
                                label="Heater 4"
                            />
                            <FormControlLabel
                                control={
                                    <IOSSwitch
                                        checked={this.props.relay.relay5}
                                        onChange={this.handleChange('relay5', RELAY5TT)}
                                        value="relay5"
                                    />
                                }
                                label="Heater 5"
                            />
                            <FormControlLabel
                                control={
                                    <IOSSwitch
                                        checked={this.props.relay.relay6}
                                        onChange={this.handleChange('relay6', RELAY6TT)}
                                        value="relay6"
                                    />
                                }
                                label="Pump"
                            />
                        </FormGroup>
                    </FormControl>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => ({
    relay: state.relay
})

export default connect(mapStateToProps, { createMessage, sendSwitches })(withStyles(styles)(SimpleCardSwitches))
