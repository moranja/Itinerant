import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from '../history'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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


export default function ItineraryAlbum(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              ITINERANT
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={9}>
                <Typography variant="h5" align="left" color="textSecondary" paragraph>
                  Welcome to itinerant, the best way to plan and organize your upcoming trips.
                  To get started, select an itinerary from below, or create your own:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                    id="standard-name"
                    label="Title"
                    name="title"
                    className={classes.textField}
                    value={props.title}
                    onChange={props.handleChange}
                    margin="none"
                  />
                  <TextField
                    id="standard-name"
                    label="Description"
                    name="description"
                    className={classes.textField}
                    value={props.description}
                    onChange={props.handleChange}
                    margin="none"
                  />
                  <TextField
                    id="standard-name"
                    label="Image URL"
                    name="imageUrl"
                    className={classes.textField}
                    value={props.imageUrl}
                    onChange={props.handleChange}
                    margin="none"
                  />
                  <Button variant="outlined" className={classes.button} onClick={props.handleSubmit}>
                    Create
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {props.itineraries.map(card => (
              <Grid item key={card.id} xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image_url}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => history.push(`/itineraries/${card.id}`)}>
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
