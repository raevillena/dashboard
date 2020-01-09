import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import SetButton from '../leads/SetButton'

import { HEATER_SETTING_TOPIC } from "../constants/topics"
const styles = {
    card: {
        minWidth: 350,
        maxWidth: 600,
        minHeight: 75,
        maxHeight: 200,
        marginRight: '15px',
        marginBottom: '15px',
    },
    root: {
        padding: 0,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,

        '&:last-child': {
            paddingBottom: 24,
        },
    },
    slider: {
        padding: '22px 0px',
    },
    button: {

    },
    input: {
        display: 'none',
    }
};



export class SimpleCardSliderHeater extends Component {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    defaultValueReducer(rawValue, props) {
        const { disabled, step } = props;
        if (disabled) { return null; }
        if (step) {
            return roundToStep(rawValue, step);
        }
        return Number(rawValue.toFixed(0));
    }


    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <Fragment>
                <Card className={classes.card}>
                    <CardContent className={classes.root}>
                        <Slider
                            classes={{ container: classes.slider }}
                            min={0}
                            max={100}
                            value={value}
                            aria-labelledby="label"
                            onChange={this.handleChange}
                            valueReducer={this.defaultValueReducer}
                        />

                    </CardContent>
                    <CardActions>
                        <SetButton value={this.state.value} topic={HEATER_SETTING_TOPIC} />
                        <Typography id="label" color="textSecondary">{`\xa0\xa0Value: ${value}`}</Typography>
                    </CardActions>
                </Card >
            </Fragment>
        )
    }
}

SimpleCardSliderHeater.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCardSliderHeater)
