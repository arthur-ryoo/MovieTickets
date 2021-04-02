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
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const user = useRecoilValue(userAtom);

  useEffect(() => {
    if (user.role === 'Admin') {
      setLoading(true);
      API.get('reservations/')
        .then((response) => {
          if (response.status === 200) {
            setReservations(response.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          alert(error);
        });
    }
  }, [setReservations, user.role]);

  const handleClickOpen = (event) => {
    setOpen(true);
    setReservationId(event.currentTarget.id * 1);
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
            <Container maxWidth="lg">
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
                              onClick={handleClickOpen}
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

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="simple-dialog-title">
                  Booking Details
                </DialogTitle>
                <DialogContent>
                  <ReservationDetails
                    reservationId={reservationId}
                    handleClose={handleClose}
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