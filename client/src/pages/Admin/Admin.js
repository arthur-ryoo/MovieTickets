import React from 'react';
import {
  Typography,
  Grid,
  Button,
  CssBaseline,
  Container,
  Link,
} from '@material-ui/core';
import useStyles from './AdminStyles';

function Admin() {
  const classes = useStyles();

  return (
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
              Movie Tickets Admin
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Manage Booking Lists and Movies
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link href="/admin/reservations" underline="none">
                    <Button variant="contained" color="primary">
                      Booking lists
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/admin/movies" underline="none">
                    <Button variant="outlined" color="primary">
                      Movies
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}

export default Admin;
