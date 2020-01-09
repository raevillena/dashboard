import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Slider } from 'material-ui-slider';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    card: {
        minWidth: 250,
        maxWidth: 300,
        minHeight: 200,
        maxHeight: 400,
        marginRight: '15px',
        marginBottom: '15px',
        boxShadow: '3px 4px 16px -8px rgba(0,0,0,0.75)'
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export class SimpleCardTextInput extends Component {

    state = {
        name: 'Rae Pogs',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    sliderState = {
        value: 50
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleSliderChange = (event, value) => {
        this.setState({ sliderValue });
        console.log(value)
    };

    render() {
        const { classes } = this.props;
        const { sliderValue } = this.sliderState;
        return (
            <div>
                <Card className={classes.card} m={1}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Text Input
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Chorva
                            </Typography>
                    </CardContent>
                    <TextField
                        id="outlined-name"
                        label={this.state.name}
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                        variant="outlined"
                    />
                </Card>
            </div>
        )
    }
}

SimpleCardTextInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCardTextInput)
