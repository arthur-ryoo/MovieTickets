import React, { useReducer } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from '@material-ui/core';
import { axiosApiInstance as API } from '../../../utils/axiosConfig';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../../atoms/atoms';

export default function MovieBookingForm(props) {
  const user = useRecoilValue(userAtom);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      qty: 0,
      price: 0,
      phone: '',
    }
  );

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.value });
    if (event.target.name === 'qty') {
      setState({
        qty: event.target.value,
        price: event.target.value * props.movieDetail.ticketPrice,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { qty, price, phone } = state;

    let body = {
      qty: qty * 1,
      price,
      phone,
      movieId: props.movieId * 1,
      userId: user.id * 1,
    };

    API.post('reservations', body)
      .then((response) => {
        if (response.status === 201) {
          props.handleSnackbar();
        }
      })
      .catch((error) => alert(error));

    props.handleClose();
  };
  return (
    <div>
      {user.isLoggedIn ? (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Booking Info
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Phone Number"
                type="text"
                fullWidth
                value={state.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="qty"
                name="qty"
                label="Number of Tickets"
                type="number"
                fullWidth
                value={state.qty}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" onChange={handleChange}>
                Total: ${props.movieDetail.ticketPrice * state.qty}
              </Typography>
            </Grid>
            <Box marginLeft="10px" marginBottom="30px">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Book
              </Button>
            </Box>
          </Grid>
        </React.Fragment>
      ) : (
        <div>
          <Typography variant="h6" color="primary">
            Login to book your ticket
          </Typography>
          <Box textAlign="center" marginY="30px">
            <Link href="/login" underline="none">
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link>
          </Box>
        </div>
      )}
    </div>
  );
}
