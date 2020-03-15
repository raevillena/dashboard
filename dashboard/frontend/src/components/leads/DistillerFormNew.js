import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import PropTypes, { object } from "prop-types";
import { addDistiller } from "../../actions/functions";
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';

import { color1 } from '../constants/colors'
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


export class DistillerFormNew extends Component {
    state = {
        name: "",
        capacity: "",
        topic: "",
        description: ""
    };

    static propTypes = {
        addDistiller: PropTypes.func.isRequired,
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { name, capacity, topic, description } = this.state
        this.props.addDistiller(name, capacity, topic, description)
        this.setState({
            name: "",
            capacity: "",
            topic: "",
            description: ""
        });
    };
    render() {
        const { name, capacity, topic, description } = this.state;
        const { classes } = this.props;
        return (
            <form onSubmit={this.onSubmit} className={classes.root}>
                <div className={classes.root2}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            className={classes.margin}
                            label="Name"
                            placeholder="Unique Name"
                            multiline
                            variant="outlined"
                            name="name"
                            onChange={this.onChange}
                            value={name}
                        />
                    </FormControl>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            label="Capacity"
                            placeholder="10L/150L/850L"
                            multiline
                            variant="outlined"
                            name="capacity"
                            onChange={this.onChange}
                            value={capacity}
                        />
                    </FormControl>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            label="Payload Topic"
                            placeholder="username/topic/topic"
                            multiline
                            variant="outlined"
                            name="topic"
                            onChange={this.onChange}
                            value={topic}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.withoutLabel} variant="outlined">
                        <TextField
                            label="Description"
                            placeholder="others"
                            multiline
                            variant="outlined"
                            name="description"
                            onChange={this.onChange}
                            value={description}
                        />
                    </FormControl>
                </div>
                <div className="form-group float-right">
                    <Button type="button" variant="outlined" color="primary" type="submit">
                        Add
                    </Button>
                </div>
            </form >
        );
    }
}


export default connect(null, { addDistiller })(withStyles(styles)(DistillerFormNew))
