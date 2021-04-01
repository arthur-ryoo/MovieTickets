import React, { useState, useEffect } from 'react';
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
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import useStyles from './HomeStyles';
import Admin from '../Admin/Admin';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { moviesAtom, userAtom } from '../../atoms/atoms';

export default function Home() {
  const classes = useStyles();
  const baseURL = 'https://movietickets.azurewebsites.net/api/';
  const [movies, setMovies] = useRecoilState(moviesAtom);
  const user = useRecoilValue(userAtom);

  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [pageSize] = useState(6);
  const [sortBy, setSortBy] = useState('');
  const [open, setOpen] = useState(false);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    axios
      .get(
        `${baseURL}movies?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sortBy}`
      )
      .then((response) => {
        if (response.status === 200) {
          setMovies(response.data);
          setNumberOfPages(response.data[0].totalPages);
        }
      });
  }, [setMovies, pageNumber, pageSize, sortBy]);

  const goToPrevious = () => {
    setPageNumber(Math.max(1, pageNumber - 1));
  };

  const goToNext = () => {
    setPageNumber(Math.min(numberOfPages, pageNumber + 1));
  };

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      {user.role === 'Admin' ? (
        <Admin />
      ) : (
        <React.Fragment>
          <CssBaseline />
          <main>
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
                  Find Movie and Book Tickets
                </Typography>
              </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
              <Typography variant="h4" align="center" gutterBottom>
                Now Playing
              </Typography>

              <div className={classes.sortBy}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink id="open-select-label">
                    Sort By
                  </InputLabel>
                  <Select
                    labelId="open-select-label"
                    id="open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={sortBy}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>Default</em>
                    </MenuItem>
                    <MenuItem value="highest_rating">
                      Rating (highest first)
                    </MenuItem>
                    <MenuItem value="lowest_rating">
                      Rating (lowest first)
                    </MenuItem>
                    <MenuItem value="longest_duration">
                      Duration (longest first)
                    </MenuItem>
                    <MenuItem value="shortest_duration">
                      Duration (shortest first)
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

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
              <Box className={classes.pagination}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={goToPrevious}
                  className={classes.previous}
                >
                  Previous
                </Button>
                {pages.map((pageIndex, index) => (
                  <Button
                    variant="outlined"
                    key={index}
                    onClick={() => setPageNumber(pageIndex + 1)}
                  >
                    {pageIndex + 1}
                  </Button>
                ))}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={goToNext}
                  className={classes.next}
                >
                  Next
                </Button>
              </Box>
            </Container>
          </main>
        </React.Fragment>
      )}
    </div>
  );
}
