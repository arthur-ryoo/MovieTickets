import React, { useReducer } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Container,
  CircularProgress,
  Backdrop,
  Grid,
  Input,
  InputLabel,
} from '@material-ui/core';
import useStyles from './MovieFormStyles';
import Alert from '@material-ui/lab/Alert';
import { axiosApiInstance as API } from '../../../../utils/axiosConfig';

export default function MovieForm(props) {
  const classes = useStyles();

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      description: '',
      language: '',
      duration: '',
      playingDate: '',
      playingTime: '',
      ticketPrice: 0,
      rating: 0,
      genre: '',
      trailorUrl: '',
      image: '',
      isLoading: false,
      error: '',
    }
  );

  const {
    name,
    description,
    language,
    duration,
    playingDate,
    playingTime,
    ticketPrice,
    rating,
    genre,
    trailorUrl,
    image,
  } = state;

  const isFormValid = () => {
    return (
      name &&
      description &&
      language &&
      duration &&
      playingDate &&
      playingTime &&
      ticketPrice &&
      rating &&
      genre &&
      trailorUrl &&
      image
    );
  };

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.value });
  };

  const handleImage = (event) => {
    setState({
      image: event.target.files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setState({ isLoading: true });

    let formData = new FormData();
    formData.append('Name', name);
    formData.append('Description', description);
    formData.append('Language', language);
    formData.append('Duration', duration);
    formData.append('PlayingDate', playingDate);
    formData.append('PlayingTime', playingTime);
    formData.append('TicketPrice', ticketPrice);
    formData.append('Rating', rating);
    formData.append('Genre', genre);
    formData.append('TrailorUrl', trailorUrl);
    formData.append('Image', image, image.name);

    API.post('movies', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          props.handleSnackbarOpen();
          props.handleDialogClose();
        }
      })
      .catch((error) => {
        console.log(error);
        setState({ error: 'Failed to add the movie' });
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
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Movie Name"
                name="name"
                type="text"
                autoFocus
                value={state.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="genre"
                label="Genre"
                type="text"
                name="genre"
                value={state.genre}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="description"
                name="description"
                label="Description"
                type="text"
                value={state.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="language"
                label="Language"
                type="text"
                name="language"
                value={state.language}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="text"
                id="duration"
                label="Duration"
                name="duration"
                value={state.duration}
                placeholder="Ex) 1h 53m"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="date"
                label="Playing Date"
                type="date"
                name="playingDate"
                value={playingDate}
                fullWidth
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="time"
                label="Playing Time"
                name="playingTime"
                type="time"
                value={playingTime}
                fullWidth
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="ticketPrice"
                label="Ticket Price"
                type="number"
                name="ticketPrice"
                value={state.ticketPrice}
                onChange={handleChange}
                placeholder="Ex) 12.99"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="rating"
                label="Rating"
                type="number"
                name="rating"
                value={state.rating}
                onChange={handleChange}
                placeholder="Ex) 8.8"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="trailorUrl"
                label="Trailor URL"
                type="text"
                name="trailorUrl"
                value={state.trailorUrl}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Upload Poster</InputLabel>
              <Input type="file" onChange={handleImage} />
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
            Submit
          </Button>
        </form>
      </div>
      <Backdrop className={classes.backdrop} open={state.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
