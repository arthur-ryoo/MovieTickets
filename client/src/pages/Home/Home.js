import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Typography,
  Container,
  Chip,
  Box,
  Link,
} from '@material-ui/core';
import useStyles from './HomeStyles';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { moviesAtom } from '../../atoms/atoms';

export default function Home() {
  const classes = useStyles();
  const baseURL = 'https://movietickets.azurewebsites.net/api/';
  const [movies, setMovies] = useRecoilState(moviesAtom);

  useEffect(() => {
    axios.get(`${baseURL}movies/`).then((response) => {
      if (response.status === 200) setMovies(response.data);
    });
  }, [setMovies]);

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Movie Tickets
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary">
              Find Movie and Buy Tickets
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Now Playing
          </Typography>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {movies.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <Link href={`/movies/${item.id}`}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={`http://movietickets.azurewebsites.net/${item.imageUrl.slice(
                        1
                      )}`}
                      title="Image title"
                    />
                  </Link>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="baseline"
                      justifyContent="space-between"
                      marginBottom="10px"
                    >
                      <Chip label={item.rating} color="primary" />
                      <Chip label={item.genre} color="secondary" />
                      <Chip label={item.duration} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
