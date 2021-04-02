import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Hidden,
  Button,
  Dialog,
  DialogContent,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from './MovieSubDetailsStyles';
import MovieBookingForm from './MovieBookingForm';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FeaturedPost(props) {
  const classes = useStyles();

  const { movieDetail } = props;

  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbar = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Grid container spacing={4}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Successfully book your ticket!
        </Alert>
      </Snackbar>
      <Grid item xs={12} md={6}>
        <CardActionArea
          component="a"
          href={movieDetail.trailorUrl}
          target="_blank"
        >
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  Movie Information
                </Typography>
                <Typography variant="subtitle1">
                  {movieDetail.language} / {movieDetail.genre} /{' '}
                  {movieDetail.rating}
                </Typography>
                <Typography variant="subtitle1">
                  {movieDetail.duration}
                </Typography>
                <Button variant="contained" color="primary">
                  Watch Trailer
                </Button>
              </CardContent>
            </div>
            <Hidden xsDown>
              {movieDetail.imageUrl ? (
                <CardMedia
                  className={classes.cardMedia}
                  image={`http://movietickets.azurewebsites.net/${movieDetail.imageUrl.slice(
                    1
                  )}`}
                  title={movieDetail.name}
                />
              ) : (
                <div></div>
              )}
            </Hidden>
          </Card>
        </CardActionArea>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                Ticket Infomation
              </Typography>
              <Typography variant="subtitle1">
                Date and Time -{' '}
                {movieDetail.playingDate &&
                  new Intl.DateTimeFormat('en-US').format(
                    new Date(movieDetail.playingDate)
                  )}
                ,{' '}
                {movieDetail.playingTime &&
                  new Intl.DateTimeFormat('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                  }).format(new Date(movieDetail.playingTime))}
              </Typography>
              <Typography variant="subtitle1">
                Price - ${movieDetail.ticketPrice}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
              >
                Book Your Ticket
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                  <MovieBookingForm
                    movieDetail={props.movieDetail}
                    movieId={props.movieId}
                    handleClose={handleClose}
                    handleSnackbar={handleSnackbar}
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}
