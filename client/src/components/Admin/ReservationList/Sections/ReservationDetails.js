import React, { useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
} from '@material-ui/core';
import { axiosApiInstance as API } from '../../../../utils/axiosConfig';
import useStyles from './ReservationDetailsStyles';
import { useRecoilState } from 'recoil';
import { reservationDetailAtom } from '../../../../atoms/atoms';

function ReservationDetails(props) {
  const classes = useStyles();

  const [reservationDetail, setReservationDetail] = useRecoilState(
    reservationDetailAtom
  );

  useEffect(() => {
    API.get(`reservations/${props.reservationId}`)
      .then((response) => {
        if (response.status === 200) {
          setReservationDetail([response.data]);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, [props.reservationId, setReservationDetail]);

  const handleCancel = () => {
    API.delete(`reservations/${props.reservationId}`)
      .then((response) => {
        if (response.status === 200) {
          props.handleSnackbar();
        }
      })
      .catch((error) => alert(error))
      .finally(() => {
        props.handleClose();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {reservationDetail &&
          reservationDetail.map((item) => (
            <Grid item key={item.id} xs={12} sm={12} md={12}>
              <Card className={classes.card}>
                {item.movieImageUrl && (
                  <CardMedia
                    className={classes.cardMedia}
                    image={`http://movietickets.azurewebsites.net/${item.movieImageUrl.slice(
                      1
                    )}`}
                    title="Image title"
                  />
                )}
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" component="h2" color="primary">
                    Name: {item.customerName}
                  </Typography>

                  <Typography variant="h6" component="h2" color="primary">
                    Email: {item.email}
                  </Typography>

                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    color="primary"
                  >
                    Phone: {item.phone}
                  </Typography>
                  <br />
                  <Typography variant="h6" component="h2">
                    Ticket Qty: {item.qty}
                  </Typography>

                  <Typography variant="h6" component="h2">
                    Total Price: ${item.price}
                  </Typography>

                  <Typography variant="h6" component="h2">
                    Movie Date:{' '}
                    {item.playingTime &&
                      new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      }).format(new Date(item.playingTime))}
                  </Typography>

                  <Typography variant="h6" component="h2">
                    Movie Time:{' '}
                    {item.playingTime &&
                      new Intl.DateTimeFormat('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                      }).format(new Date(item.playingTime))}
                  </Typography>

                  <Box marginTop="30px" marginBottom="30px">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCancel}
                    >
                      Cancel Ticket
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </React.Fragment>
  );
}

export default ReservationDetails;
