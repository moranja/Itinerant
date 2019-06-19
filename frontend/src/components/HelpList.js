import React from 'react';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import YouTube from 'react-youtube'

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
        <Grid item xs={12} component={Paper} elevation={6} style={{ backgroundColor: "#eae9e7", minHeight: "100vh"}} square>
          <div className={classes.paper}>
            <React.Fragment>
            <CssBaseline />
            <main>
              {/* Hero unit */}
              <div className={classes.heroContent} style={{ backgroundColor: "#eae9e7"}}>
                <Container maxWidth="md">
                  <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                    Please watch this guide for some direction about how to use Itinerant:
                  </Typography>
                  <br/>
                  <Grid spacing={0} align="center">
                  <YouTube videoId={"5uPsGwJhe8c"}/>
                  </Grid>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
                    If you have feature suggestions, or find any bugs, please&nbsp;
                    <a href="mailto: jeffadammoran@gmail.com">{'let me know!'}</a>
                  </Typography>
                </Container>
              </div>
            </main>
            </React.Fragment>
          </div>
        </Grid>
      </Container>
  );
}
