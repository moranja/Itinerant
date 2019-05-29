import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import history from '../history'
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBarText: {
    color: "black"
  }
}));

function DenseAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#923c2d" }}>
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.appBarText} onClick={() => history.push(`/`)}>
            Home
          </Typography>
          &nbsp;
          &nbsp;
          &nbsp;
          <Typography variant="h6" className={classes.appBarText} onClick={() => history.push(`/profile`)}>
            Profile
          </Typography>
          &nbsp;
          &nbsp;
          &nbsp;
          <Typography variant="h6" className={classes.appBarText} onClick={() => history.push(`/login`)}>
            Login
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default DenseAppBar;

// <MenuIcon />?
