import React, { Component } from 'react'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { color1, appbarColor } from '../constants/colors'
import { grey } from '@material-ui/core/colors'
import { sendSwitches } from '../../actions/payload'
import { createMessage } from '../../actions/messages'
import { connect } from 'react-redux'
import {
    RELAY6_TX_TOPIC
} from '../constants/topics'
import { actiontimeout } from '../constants/settings'

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
    paper: {
        textAlign: 'center',
    },
});

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },

    bottompaper: {
        height: '100%',
    },
    expanded: {
        height: '100%',
        width: '100%',
    },
});

export class Pump extends Component {
    state = {
        changed: false,
        promiseCame: false
    }
    static propTypes = {
        relay: PropTypes.bool.isRequired,
        classes: PropTypes.object.isRequired,
    }
    handleChange = (name, topic) => event => {
        this.props.sendSwitches(topic, event.target.checked)
        this.setState({ [name]: event.target.checked, changed: true })
        setTimeout( () => {
            if(this.state.changed === true){
                this.props.createMessage({ sendMqttError: `Action timeout` })
                this.setState({ changed: false })
            }
        }, actiontimeout )
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.relay !== prevState.relay) {
            return { relay: nextProps.relay, promiseCame: true }
        }
        else return null;
    }
    render() {
        const { relay, classes } = this.props
        let { changed, promiseCame } = this.state
        if (promiseCame === true) {
            changed = false
            this.props.createMessage({ sendMqttMessage: `Setting changed` })
            this.state.changed = false
            this.state.promiseCame = false
        }
        return (
            <MuiThemeProvider theme={theme}>
                <Grid container spacing={1}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Grid container>
                                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                        <Grid container direction="column" justify="center" alignItems="flex-start" className={classes.bottompaper}>
                                            <Grid item>
                                                {changed ? <CircularProgress size={25} style={{ color: grey[10] }} /> : 'Pump(On/Off)'}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                        <Grid container direction="column" justify="center" alignItems="flex-end" className={classes.bottompaper}>
                                            <Grid item>
                                                <CustomSwitch checked={relay} onChange={this.handleChange('relay6', RELAY6_TX_TOPIC)} value="relay6" disabled={changed} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => ({
    relay: state.relay.relay6
})

export default connect(mapStateToProps, { createMessage, sendSwitches })(withStyles(styles)(Pump))