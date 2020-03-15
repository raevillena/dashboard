import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HistoryIcon from '@material-ui/icons/History';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import PortraitIcon from '@material-ui/icons/Portrait';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import DnsIcon from '@material-ui/icons/Dns';

import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import { Link, NavLink } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

export class Sidebar extends Component {

  renderLink = React.forwardRef((itemProps, ref) => <NavLink to="/" {...itemProps} ref={ref} />);
  renderLink2 = React.forwardRef((itemProps, ref) => <NavLink to="/records" {...itemProps} ref={ref} />);
  renderLink5 = React.forwardRef((itemProps, ref) => <NavLink to="/distillers" {...itemProps} ref={ref} />);
  renderLink3 = React.forwardRef((itemProps, ref) => <NavLink to="/about" {...itemProps} ref={ref} />);
  renderLink4 = React.forwardRef((itemProps, ref) => <NavLink to="/contactus" {...itemProps} ref={ref} />);
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} style={{ width: 300 }}>
        <List component="nav">

        </List>
        <Divider />
        <List component="nav">
          <ListItem button onClick={() => this.props.toggle(false)} component={this.renderLink}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Monitor" />
          </ListItem>
          <ListItem button onClick={() => this.props.toggle(false)} component={this.renderLink2}>
            <ListItemIcon>
              <DnsIcon />
            </ListItemIcon>
            <ListItemText primary="Records" />
          </ListItem>
          <ListItem button component={this.renderLink5} onClick={() => this.props.toggle(false)}>
            <ListItemIcon>
              <WhatshotIcon />
            </ListItemIcon>
            <ListItemText primary="Distillers" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav">
          <ListItem button onClick={() => this.props.toggle(false)} component={this.renderLink3}>
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
          </ListItem>
          <ListItem button onClick={() => this.props.toggle(false)} component={this.renderLink4}>
            <ListItemIcon>
              <PortraitIcon />
            </ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
        </List>
      </div>
    )
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};


export default connect(null, { logout })(withStyles(styles)(Sidebar));

