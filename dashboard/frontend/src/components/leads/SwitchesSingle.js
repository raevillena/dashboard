import React, { Component } from 'react'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CircularProgress from '@material-ui/core/CircularProgress'
import { grey } from '@material-ui/core/colors'
import { color1, appbarColor } from '../constants/colors'
import { sendDC } from '../../actions/payload'
import { createMessage } from '../../actions/messages'
import { actiontimeout } from '../constants/settings'
import { connect } from 'react-redux'
import {
    DC_TX_TOPIC
} from '../constants/topics'

import { CustomSlider } from '../layout/CustomSlider'

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

export class SwitchesSingle extends Component {
    state = {
        value: this.props.dutycycle,
        changed: false,
        promiseCame: false
    }
    static propTypes = {
        dutycycle: PropTypes.number.isRequired,
        classes: PropTypes.object.isRequired,
    }
    handleChange = () => (event, newValue) => {
        this.setState({ value: newValue })
    }
    handleStatus = (topic) => (event, newValue) => {
        this.props.sendDC(topic, newValue)
        this.setState({ value: newValue, changed: true, promiseCame: false })
        setTimeout( () => {
            if(this.state.changed === true){
                this.props.createMessage({ sendMqttError: `Action timeout` })
                this.setState({ changed: false })
            }
        }, actiontimeout )
    }
    handleButtons = (operation) => event => {
        const val = this.state.value + operation
        if (val > -1 && val < 101) {
            this.setState({ value: val })
            clearInterval(this.myInterval)
            this.myInterval = setInterval(() => {
                this.setState({ changed: true, promiseCame: false })
                this.props.sendDC(DC_TX_TOPIC, this.state.value)
                clearInterval(this.myInterval)
                setTimeout( () => {
                    if(this.state.changed === true){
                        this.props.createMessage({ sendMqttError: `Action timeout` })
                        this.setState({ changed: false })
                    }
                }, actiontimeout )
            }, 500)
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.dutycycle !== prevState.dutycycle) {
            return { dutycycle: nextProps.dutycycle, promiseCame: true }
        }
        else return null;
    }
    render() {
        const { dutycycle, classes } = this.props
        let { value, changed, promiseCame } = this.state
        if (promiseCame === true) {
            value = dutycycle
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
                                    <Grid item xl={1} lg={1} md={1} sm={1} xs={12}>
                                        <Grid container direction="column" justify="center" alignItems="flex-start" className={classes.bottompaper}>
                                            <Grid item>
                                                {changed ? <CircularProgress size={25} style={{ color: grey[10] }} /> : 'Heater (%)'}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xl={11} lg={11} md={11} sm={11} xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xl={1} lg={1} md={1} sm={1} xs={2}>
                                                <Grid container direction="column" justify="center" alignItems="center" className={classes.bottompaper}>
                                                    <Grid item >
                                                        <IconButton aria-label="Decrease" onClick={this.handleButtons(-1)} disabled={changed || this.props.disable}>
                                                            <ArrowBackIosIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xl={10} lg={10} md={10} sm={10} xs={8}>
                                                <Grid container direction="row" justify="center" alignItems="center" className={classes.expanded}>
                                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                        <CustomSlider value={value} onChange={this.handleChange()} onChangeCommitted={this.handleStatus(DC_TX_TOPIC)} aria-label="Set Heater Seting" defaultValue={dutycycle} valueLabelDisplay="on" disabled={changed || this.props.disable} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xl={1} lg={1} md={1} sm={1} xs={2}>
                                                <Grid container direction="column" justify="center" alignItems="center" className={classes.bottompaper}>
                                                    <Grid item>
                                                        <IconButton aria-label="Increase" onClick={this.handleButtons(+1)} disabled={changed || this.props.disable}>
                                                            <ArrowForwardIosIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
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
    dutycycle: state.relay.dutycycle
})

export default connect(mapStateToProps, { createMessage, sendDC })(withStyles(styles)(SwitchesSingle))
