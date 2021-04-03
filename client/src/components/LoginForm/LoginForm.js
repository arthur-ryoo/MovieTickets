import React, { useEffect, useReducer } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../atoms/atoms';
import axios from 'axios';
import LocalStorageService from '../../utils/localStorageService';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Backdrop,
} from '@material-ui/core';
import useStyles from './LoginFormStyles';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';

export default function LoginForm() {
  const classes = useStyles();
  const history = useHistory();
  // eslint-disable-next-line
  const [user, setUser] = useRecoilState(userAtom);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      password: '',
      isLoading: false,
      isChecked: false,
      error: '',
    }
  );

  useEffect(() => {
    if (localStorage.username && localStorage.checkbox !== '') {
      setState({
        email: localStorage.username,
        isChecked: true,
      });
    }
  }, []);

  const isFormValid = () => {
    return state.email && state.password;
  };

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setState({
      isChecked: event.target.checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setState({ isLoading: true });

    const baseURL = 'https://movietickets.azurewebsites.net/api/';

    const { email, password, isChecked } = state;

    if (isChecked && email !== '') {
      localStorage.setItem('username', email);
      localStorage.setItem('checkbox', isChecked);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('checkbox');
    }

    let body = {
      email,
      password,
    };

    axios
      .post(`${baseURL}users/login`, body)
      .then((response) => {
        if (response.status === 200) {
          setUser({
            id: response.data.user_id,
            role: response.data.user_role,
            isLoggedIn: true,
          });
          LocalStorageService.setToken(response.data);
          history.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
        setState({ error: 'Failed to login' });
      })
      .finally(() => {
        setState({ isLoading: false });
      });
  };

  const handleAdminSubmit = (event) => {
    event.preventDefault();
    setState({ isLoading: true });

    const baseURL = 'https://movietickets.azurewebsites.net/api/';

    let body = {
      email: 'admin@movietickets.com',
      password: 'Anqlxlzpt',
    };

    axios
      .post(`${baseURL}users/login`, body)
      .then((response) => {
        if (response.status === 200) {
          setUser({
            id: response.data.user_id,
            role: response.data.user_role,
            isLoggedIn: true,
          });
          LocalStorageService.setToken(response.data);
          history.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
        setState({ error: 'Failed to login' });
      })
      .finally(() => {
        setState({ isLoading: false });
      });
  };

  const handleUserSubmit = (event) => {
    event.preventDefault();
    setState({ isLoading: true });

    const baseURL = 'https://movietickets.azurewebsites.net/api/';

    let body = {
      email: 'user@movietickets.com',
      password: 'Anqlxlzpt',
    };

    axios
      .post(`${baseURL}users/login`, body)
      .then((response) => {
        if (response.status === 200) {
          setUser({
            id: response.data.user_id,
            role: response.data.user_role,
            isLoggedIn: true,
          });
          LocalStorageService.setToken(response.data);
          history.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
        setState({ error: 'Failed to login' });
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
          Log in
        </Typography>
        {state.error && (
          <Alert className={classes.alert} severity="error">
            {state.error}
          </Alert>
        )}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={state.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <FormControlLabel
            control={
              <Checkbox
                checked={state.isChecked}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isFormValid()}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>

        <form className={classes.form} noValidate onSubmit={handleAdminSubmit}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Demo Login as Admin
          </Button>
        </form>

        <form className={classes.form} noValidate onSubmit={handleUserSubmit}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Demo Login as User
          </Button>
        </form>
      </div>
      <Backdrop className={classes.backdrop} open={state.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
