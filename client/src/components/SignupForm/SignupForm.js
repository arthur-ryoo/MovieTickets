import React, { useReducer } from 'react';
import axios from 'axios';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Backdrop,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import useStyles from './SignUpFormStyles';

export default function SignupForm() {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      email: '',
      password: '',
      isLoading: false,
      error: '',
    }
  );

  const isFormValid = () => {
    return state.name && state.email && state.password;
  };

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setState({ isLoading: true });

    const baseURL = 'https://movietickets.azurewebsites.net/api/';

    const { name, email, password } = state;

    let body = {
      name,
      email,
      password,
    };

    axios
      .post(`${baseURL}users/register`, body)
      .then((response) => {
        console.log(response);
        if (response.status === 201) history.push('/login');
      })
      .catch((error) => {
        console.log(error);
        setState({ error: 'Failed to sign up' });
      })
      .finally(() => {
        setState({ isLoading: false });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {state.error && (
          <Alert className={classes.alert} severity="error">
            {state.error}
          </Alert>
        )}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={state.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={state.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={state.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isFormValid()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-start">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Backdrop className={classes.backdrop} open={state.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
