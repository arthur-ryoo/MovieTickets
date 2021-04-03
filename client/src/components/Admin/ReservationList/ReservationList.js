import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Hidden,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  CssBaseline,
  LinearProgress,
  MenuItem,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from './ReservationListStyles';
import ReservationDetails from './Sections/ReservationDetails';
import { axiosApiInstance as API } from '../../../utils/axiosConfig';
import { useRecoilState, useRecoilValue } from 'recoil';
import { reservationsAtom, userAtom } from '../../../atoms/atoms';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ReservationList() {
  const [reservations, setReservations] = useRecoilState(reservationsAtom);
  const [reservationId, setReservationId] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [pageSize] = useState(6);
  const [sortBy, setSortBy] = useState('');
  const [sortByOpen, setSortByOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const classes = useStyles();

  const user = useRecoilValue(userAtom);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    if (user.role === 'Admin') {
      setLoading(true);
      API.get(
        `reservations?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sortBy}&keyword=${debouncedValue}`
      )
        .then((response) => {
          if (response.status === 200) {
            setReservations(response.data);
            setNumberOfPages(response.data[0].totalPages);
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          alert(error);
        });
    }
  }, [
    setReservations,
    user.role,
    pageNumber,
    pageSize,
    sortBy,
    debouncedValue,
  ]);

  const goToPrevious = () => {
    setPageNumber(Math.max(1, pageNumber - 1));
  };

  const goToNext = () => {
    setPageNumber(Math.min(numberOfPages, pageNumber + 1));
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    setTimeout(() => {
      setDebouncedValue(event.target.value);
    }, 1500);
  };

  const handleSortByClose = () => {
    setSortByOpen(false);
  };

  const handleSortByOpen = () => {
    setSortByOpen(true);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleDialogOpen = (event) => {
    setDialogOpen(true);
    setReservationId(event.currentTarget.id * 1);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
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
    <div>
      {user.role === 'Admin' ? (
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
                  Booking Admin
                </Typography>
              </Container>
            </div>
          </main>

          <CssBaseline />
          <div className={classes.container}>
            <Container maxWidth="md">
              <div className={classes.sortBy_search}>
                <TextField
                  variant="outlined"
                  label="Search"
                  value={keyword}
                  placeholder="Customer Name"
                  onChange={handleKeywordChange}
                />

                <FormControl className={classes.formControl}>
                  <InputLabel shrink id="open-select-label">
                    Sort By
                  </InputLabel>
                  <Select
                    labelId="open-select-label"
                    id="open-select"
                    open={sortByOpen}
                    onClose={handleSortByClose}
                    onOpen={handleSortByOpen}
                    value={sortBy}
                    onChange={handleSortByChange}
                  >
                    <MenuItem value="">
                      <em>Default (latest first)</em>
                    </MenuItem>
                    <MenuItem value="created_oldest">
                      Created (oldest first)
                    </MenuItem>
                    <MenuItem value="movie_name">Movie (A to Z)</MenuItem>
                    <MenuItem value="customer_name">
                      Customer Name (A to Z)
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              {loading ? (
                <LinearProgress />
              ) : (
                <Grid container spacing={4}>
                  <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                  >
                    <Alert onClose={handleSnackbarClose} severity="success">
                      Successfully canceled the ticket!
                    </Alert>
                  </Snackbar>

                  {reservations.map((item) => (
                    <Grid item key={item.id} xs={12} md={6}>
                      <Card className={classes.card}>
                        <div className={classes.cardDetails}>
                          <CardContent>
                            <Typography component="h2" variant="h6">
                              Booking ID# {item.id}
                            </Typography>
                            <Typography variant="subtitle1">
                              {item.customerName}
                            </Typography>
                            <Typography variant="subtitle1">
                              {item.movieName}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                              }).format(new Date(item.reservationTime))}
                            </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleDialogOpen}
                              id={item.id}
                            >
                              Details
                            </Button>
                          </CardContent>
                        </div>
                        <Hidden xsDown>
                          {item.movieImageUrl && (
                            <CardMedia
                              className={classes.cardMedia}
                              image={`http://movietickets.azurewebsites.net/${item.movieImageUrl.slice(
                                1
                              )}`}
                              title="unsplash image"
                            />
                          )}
                        </Hidden>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
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

              <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle id="simple-dialog-title">
                  Booking Details
                </DialogTitle>
                <DialogContent>
                  <ReservationDetails
                    reservationId={reservationId}
                    handleDialogClose={handleDialogClose}
                    handleSnackbar={handleSnackbar}
                  />
                </DialogContent>
              </Dialog>
            </Container>
          </div>
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
