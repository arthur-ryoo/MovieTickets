import React, { useEffect, useReducer } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../atoms/atoms';
import { axiosApiInstance as API } from '../../utils/axiosConfig';
import LocalStorageService from '../../utils/localStorageService';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Backdrop,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Movie Tickets
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

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

    API.post('users/login', body)
      .then((response) => {
        if (response.status === 200) {
          setUser({
            id: response.data.user_id,
            role: response.data.user_role,
            isLoggined: true,
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
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Backdrop className={classes.backdrop} open={state.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
