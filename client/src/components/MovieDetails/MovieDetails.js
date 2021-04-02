import React, { useEffect } from 'react';
import {
  Paper,
  Typography,
  Grid,
  CssBaseline,
  Container,
} from '@material-ui/core';
import useStyles from './MovieDetailsStyles';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { movieDetailAtom } from '../../atoms/atoms';
import MovieSubDetails from './Sections/MovieSubDetails';

export default function MovieDetails(props) {
  const classes = useStyles();
  const baseURL = 'https://movietickets.azurewebsites.net/api/';

  const [movieDetail, setMovieDetail] = useRecoilState(movieDetailAtom);
  const movieId = props.match.params.id;

  useEffect(() => {
    axios.get(`${baseURL}movies/${movieId}`).then((response) => {
      if (response.status === 200) {
        setMovieDetail(response.data);
      }
    });
  }, [movieId, setMovieDetail]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.container}>
        <Container maxWidth="lg">
          <Paper
            className={classes.mainFeaturedPost}
            style={
              movieDetail.imageUrl && {
                backgroundImage: `url(
          http://movietickets.azurewebsites.net/${movieDetail.imageUrl.slice(1)}
          )`,
              }
            }
          >
            {/* Increase the priority of the hero background image */}
            {movieDetail.imageUrl && (
              <img
                style={{ display: 'none' }}
                src={`http://movietickets.azurewebsites.net/${movieDetail.imageUrl.slice(
                  1
                )}`}
                alt={movieDetail.name}
              />
            )}
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                  >
                    {movieDetail.name}
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    {movieDetail.description}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
          <MovieSubDetails movieDetail={movieDetail} movieId={movieId} />
        </Container>
      </div>
    </React.Fragment>
  );
}
