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
} from '@material-ui/core';
import useStyles from './MovieSubDetailsStyles';

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { movieDetail } = props;

  return (
    <Grid container spacing={4}>
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
              <CardMedia
                className={classes.cardMedia}
                src={movieDetail.trailorUrl}
                image={
                  movieDetail.imageUrl &&
                  `http://movietickets.azurewebsites.net/${movieDetail.imageUrl.slice(
                    1
                  )}`
                }
                title={movieDetail.name}
              />
            </Hidden>
          </Card>
        </CardActionArea>
      </Grid>
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
                <Button variant="contained" color="primary">
                  Book a Ticket
                </Button>
              </CardContent>
            </div>
          </Card>
        </CardActionArea>
      </Grid>
    </Grid>
  );
}
