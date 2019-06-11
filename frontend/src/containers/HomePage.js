import React from 'react'
import ItineraryIndex from '../containers/ItineraryIndex'

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavBar'

const useStyles = makeStyles(theme => ({
  background: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    backgroundColor: "#393b3a",
    backgroundSize: "100%"
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
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
  },
}));

const HomePage = (props) => {

  const classes = useStyles();

  return (
    <div>
      <NavBar clearItinerary={() => {}}/>
      <Container component="main">
        <CssBaseline />
        <Grid item xs={12} component={Paper} elevation={6} style={{ backgroundColor: "#eae9e7"}} square>
          <div className={classes.paper}>
            <React.Fragment>
              <ItineraryIndex history={props.history}/>
            </React.Fragment>
          </div>
        </Grid>
      </Container>
    </div>
  )
}

export default HomePage
