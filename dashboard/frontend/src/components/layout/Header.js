import React, { Component, Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'
import { logout } from '../../actions/auth'

import SidebarLayout from "react-advanced/SidebarLayout";
import Sidebar from "./Sidebar";

import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//import component for account logout
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { grey } from '@material-ui/core/colors';

import { appbarColor } from '../constants/colors'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    secondary: {
      main: appbarColor,
    },
  },
});

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export class Header extends Component {

  static propTypes = {
    auth: Proptypes.object.isRequired,
    logout: Proptypes.func.isRequired,
    classes: Proptypes.object.isRequired
  }

  state = {
    anchorEl: undefined,
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: undefined });
  };

  render() {

    const { isAuthenticated, user } = this.props.auth
    const { classes } = this.props

    const authLinks = (
      <div>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
          <AccountCircleIcon fontSize="large" style={{ color: grey[50] }} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <div className="d-flex justify-content-center">
            <h6 className="text-muted font-weight-bol">{user ? user.username : ''}</h6>
          </div>
          <MenuItem onClick={this.props.logout}>Logout</MenuItem>
        </Menu>
      </div>
      /*
      <div className="dropdown">
        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {user ? user.username : ''}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button className="dropdown-item" type="button" onClick={this.props.logout}>Logout {user ? user.username : ''}</button>
        </div>
      </div> */
    )
    const registerLink = React.forwardRef((props, ref) => <NavLink to="/register" {...props} ref={ref} />);
    const loginLink = React.forwardRef((props, ref) => <NavLink to="/login" {...props} ref={ref} />);
    const guestLinks = (
      <div>
        <Button color="inherit" component={loginLink}>Login</Button>
        <Button color="inherit" component={registerLink}>Register</Button>
      </div>
    )

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <SidebarLayout Leftbar={Sidebar}>
            {({ toggleLeftbar }) => (
              <div>
                <div className={classes.root}>
                  <AppBar position="static" color='secondary'>
                    <Toolbar>
                      <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => isAuthenticated ? toggleLeftbar() : null}>
                        <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" color="inherit" className={classes.flex}>
                        MMSU e-Distiller Manager
                      </Typography>
                      {isAuthenticated ? authLinks : guestLinks}
                    </Toolbar>
                  </AppBar>
                </div>
              </div>
            )}
          </SidebarLayout>
        </MuiThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(withStyles(styles)(Header))