import React from 'react'
import PropTypes from 'prop-types'
import DistillersTable from './DistillersTable'

import { color1 } from '../constants/colors'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

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

const styles = theme => ({
  root: {
      flexGrow: 1,
  },
  paper: {
      padding: theme.spacing(2),
      height: '100%',
      textAlign: 'left',
      color: theme.palette.text.secondary,
  },
});

function Distillers(props) {
  const { classes } = props;

  return (
      <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
              <Grid container spacing={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div style={{ paddingTop: 20 }}>
                        <DistillersTable />
                      </div>
                  </Grid>
              </Grid>
          </div>
      </MuiThemeProvider>
  );
}

Distillers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Distillers);
