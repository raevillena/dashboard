import React, { Component, Fragment } from 'react'
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
    primary: {
      main: grey[100],
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
    anchorEl: null,
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  };

  render() {

    const { isAuthenticated, user } = this.props.auth
    const { classes } = this.props
    const authLinks = (
      <div>
        <IconButton aria-controls="logout-menu" aria-haspopup="true" onClick={this.handleClick}>
          <AccountCircleIcon fontSize="large" style={{ color: grey[100] }} />
        </IconButton>
        <Menu
          id="logout-menu"
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
                      <IconButton className={classes.menuButton} style={{ color: grey[100] }} aria-label="Menu" onClick={() => isAuthenticated ? toggleLeftbar() : null}>
                        <MenuIcon />
                      </IconButton>
                      <Typography className={classes.flex} variant="h6" style={{ color: grey[100] }} >
                        ZFFD Connect
                      </Typography>
                      {isAuthenticated ? authLinks : this.state.anchorEl = null}
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