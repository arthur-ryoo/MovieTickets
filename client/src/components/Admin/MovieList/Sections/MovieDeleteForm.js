import React, { useReducer } from 'react';
import {
  Button,
  CssBaseline,
  Container,
  CircularProgress,
  Backdrop,
  Grid,
  Typography,
} from '@material-ui/core';
import useStyles from './MovieFormStyles';
import Alert from '@material-ui/lab/Alert';
import { axiosApiInstance as API } from '../../../../utils/axiosConfig';

export default function MovieEditForm(props) {
  const classes = useStyles();

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      isLoading: false,
      error: '',
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setState({ isLoading: true });

    API.delete(`movies/${props.movieId}`)
      .then((response) => {
        if (response.status === 200) {
          props.handleDeleteSnackbarOpen();
          props.handleDeleteDialogClose();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
        setState({ error: 'Failed to delete the movie' });
      })
      .finally(() => {
        setState({ isLoading: false });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {state.error && (
          <Alert className={classes.alert} severity="error">
            {state.error}
          </Alert>
        )}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Typography variant="h6" color="primary">
              Are you sure you want to delete?
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Delete
            </Button>
          </Grid>
        </form>
      </div>
      <Backdrop className={classes.backdrop} open={state.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
