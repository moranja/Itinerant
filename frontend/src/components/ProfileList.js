import React from 'react';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ProfileItineraries from './ProfileItineraries'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  button: {
    margin: theme.spacing(1),
  }
}));


export default function ProfileList(props) {
  const classes = useStyles();

  return (
      <Container component="main">
        <CssBaseline />
        <Grid item xs={12} component={Paper} elevation={6} style={{ backgroundColor: "#eae9e7"}} square>
          <div className={classes.paper}>
            <React.Fragment>
              <ProfileItineraries itineraries={props.itineraries} name={props.name} history={props.history}/>
            </React.Fragment>
          </div>
        </Grid>
      </Container>
  );
}
