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
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  LinearProgress,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from './MovieListStyles';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { moviesAtom, userAtom } from '../../../atoms/atoms';
import MovieForm from './Sections/MovieForm';
import MovieEditForm from './Sections/MovieEditForm';
import MovieDeleteForm from './Sections/MovieDeleteForm';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MovieList() {
  const classes = useStyles();

  const baseURL = 'https://movietickets.azurewebsites.net/api/';

  const [loading, setLoading] = useState(false);

  const user = useRecoilValue(userAtom);
  const [movies, setMovies] = useRecoilState(moviesAtom);

  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [pageSize] = useState(6);
  const [sortBy, setSortBy] = useState('');
  const [open, setOpen] = useState(false);

  const [movieId, setMovieId] = useState(0);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editSnackbarOpen, setEditSnackbarOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    if (user.role === 'Admin') {
      setLoading(true);
      axios
        .get(
          `${baseURL}movies?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sortBy}`
        )
        .then((response) => {
          if (response.status === 200) {
            setMovies(response.data);
            setNumberOfPages(response.data[0].totalPages);
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          alert(error);
        });
    }
  }, [setMovies, pageNumber, pageSize, sortBy, user.role]);

  const goToPrevious = () => {
    setPageNumber(Math.max(1, pageNumber - 1));
  };

  const goToNext = () => {
    setPageNumber(Math.min(numberOfPages, pageNumber + 1));
  };

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterClose = () => {
    setOpen(false);
  };

  const handleFilterOpen = () => {
    setOpen(true);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleEditDialogOpen = (event) => {
    setEditDialogOpen(true);
    setMovieId(event.currentTarget.id * 1);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSnackbarOpen = () => {
    setEditSnackbarOpen(true);
  };

  const handleEditSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setEditSnackbarOpen(false);
  };

  const handleDeleteDialogOpen = (event) => {
    setDeleteDialogOpen(true);
    setMovieId(event.currentTarget.id * 1);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteSnackbarOpen = () => {
    setDeleteSnackbarOpen(true);
  };

  const handleDeleteSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setDeleteSnackbarOpen(false);
  };

  return (
    <div>
      {user.role === 'Admin' ? (
        <React.Fragment>
          <CssBaseline />
          <main>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              <Alert onClose={handleSnackbarClose} severity="success">
                Successfully added the movie!
              </Alert>
            </Snackbar>

            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={editSnackbarOpen}
              autoHideDuration={6000}
              onClose={handleEditSnackbarClose}
            >
              <Alert onClose={handleEditSnackbarClose} severity="success">
                Successfully updated the movie!
              </Alert>
            </Snackbar>

            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={deleteSnackbarOpen}
              autoHideDuration={6000}
              onClose={handleDeleteSnackbarClose}
            >
              <Alert onClose={handleDeleteSnackbarClose} severity="success">
                Successfully deleted the movie!
              </Alert>
            </Snackbar>

            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Movies Admin
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDialogOpen}
                      >
                        New Movie
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
              <div className={classes.sortBy}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink id="open-select-label">
                    Sort By
                  </InputLabel>
                  <Select
                    labelId="open-select-label"
                    id="open-select"
                    open={open}
                    onClose={handleFilterClose}
                    onOpen={handleFilterOpen}
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

              {loading ? (
                <LinearProgress />
              ) : (
                <Grid container spacing={4}>
                  {movies.map((item) => (
                    <Grid item key={item.id} xs={6} sm={6} md={4}>
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
                          <Box className={classes.chip}>
                            <Chip label={item.rating} color="primary" />
                            <Chip label={item.genre} color="secondary" />
                            <Chip label={item.duration} />
                          </Box>
                          <Box display="flex" justifyContent="space-around">
                            <Button
                              color="primary"
                              id={item.id}
                              onClick={handleEditDialogOpen}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              color="secondary"
                              id={item.id}
                              onClick={handleDeleteDialogOpen}
                            >
                              <DeleteIcon />
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle id="simple-dialog-title">Add Movie</DialogTitle>
                <DialogContent>
                  <MovieForm
                    handleDialogClose={handleDialogClose}
                    handleSnackbarOpen={handleSnackbarOpen}
                  />
                </DialogContent>
              </Dialog>

              <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle id="edit-dialog-title">Edit Movie</DialogTitle>
                <DialogContent>
                  <MovieEditForm
                    handleEditDialogClose={handleEditDialogClose}
                    handleEditSnackbarOpen={handleEditSnackbarOpen}
                    movieId={movieId}
                  />
                </DialogContent>
              </Dialog>

              <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle id="delete-dialog-title">Delete Movie</DialogTitle>
                <DialogContent>
                  <MovieDeleteForm
                    handleDeleteDialogClose={handleDeleteDialogClose}
                    handleDeleteSnackbarOpen={handleDeleteSnackbarOpen}
                    movieId={movieId}
                  />
                </DialogContent>
              </Dialog>

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
      ) : (
        <div>
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
                  Admin Only Page
                </Typography>
              </Container>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
