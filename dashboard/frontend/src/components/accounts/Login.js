import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'
import { login } from '../../actions/auth'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { appbarColor, color1 } from '../constants/colors'

//material ui imports
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CardMedia from '@material-ui/core/CardMedia'
import { grey } from '@material-ui/core/colors'

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: appbarColor,
        },
        secondary: {
            main: color1,
        },
    },
});

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: theme.palette.primary.main
    },
    logo: {
        height: 100,
        width: 100,
    }
});


function Copyright() {
    return (
        <Typography variant="body2" color="secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.facebook.com/NBioERDE/">
                NBERIC
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    static Proptypes = {
        login: Proptypes.func.isRequired,
        isAuthenticated: Proptypes.bool,
        isLoggingIn: Proptypes.bool,
        classes: Proptypes.object.isRequired
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.login(this.state.username, this.state.password)
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        const { isLoggingIn, classes } = this.props
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        const { username, password } = this.state;
        return (
            <Fragment>
                <MuiThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <CardMedia
                                component="img"
                                alt="NBERIC"
                                className={classes.logo}
                                image="/static/frontend/nberic_seal_100x100.png"
                                title="National Bioenergy Research and Innovation Center"
                            />
                            <Typography component="h1" variant="h5">
                                Sign in
                        </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={this.onChange}
                                    value={username}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={this.onChange}
                                    value={password}
                                />
                                {/*<FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Keep me logged in"
                                />*/}
                                {isLoggingIn ? (
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={this.onSubmit}
                                    >
                                        <CircularProgress size={25} style={{ color: grey[100] }} />
                                    </Button>
                                ) : (
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={this.onSubmit}
                                        >
                                            <Typography style={{ color: grey[100] }} >
                                                Sign In
                                        </Typography>
                                        </Button>
                                    )}
                                <Grid container>
                                    <Grid item>
                                        Don't have an account? <a style={{ color: appbarColor }} href="mailto:nberic@mmsu.edu.p">Email Us</a>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </Container>
                </MuiThemeProvider>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoggingIn: state.auth.isLoggingIn
})

export default connect(mapStateToProps, { login })(withStyles(styles)(Login))
