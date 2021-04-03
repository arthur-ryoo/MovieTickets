import {
  AppBar,
  Container,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Fab,
  Typography,
} from '@material-ui/core';
import useStyles from './NavbarStyles';
import { KeyboardArrowUp } from '@material-ui/icons';
import React from 'react';
import HideOnScroll from './Sections/HideOnScroll';
import SideDrawer from './Sections/SideDrawer';
import BackToTop from './Sections/BackToTop';
import {
  isLoggedInLinks,
  isLoggedInAsAdminLinks,
  isNotLoggedInLinks,
} from './Sections/NavbarItems';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../atoms/atoms';
import LocalStorageService from '../../utils/localStorageService';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useRecoilState(userAtom);

  const handleLogout = (event) => {
    if (event.currentTarget.id === 'logout') {
      LocalStorageService.clearToken();
      setUser({
        id: 0,
        role: '',
        isLoggedIn: false,
      });
    }
  };

  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed">
          <Toolbar component="nav">
            <Container maxWidth="md" className={classes.navbarDisplayFlex}>
              <IconButton edge="start" aria-label="home">
                <a href="/" style={{ color: 'white', textDecoration: 'none' }}>
                  <Typography variant="h6">Movie Tickets</Typography>
                </a>
              </IconButton>

              <Hidden smDown>
                <List
                  component="nav"
                  aria-labelledby="main navigation"
                  className={classes.navListDisplayFlex}
                >
                  {user.isLoggedIn && user.role === 'Admin' ? (
                    <>
                      {isLoggedInAsAdminLinks.map(({ title, path, id }) => (
                        <a
                          href={path}
                          key={title}
                          className={classes.linkText}
                          onClick={handleLogout}
                          id={id}
                        >
                          <ListItem button>
                            <ListItemText primary={title} />
                          </ListItem>
                        </a>
                      ))}
                    </>
                  ) : user.isLoggedIn ? (
                    <>
                      {isLoggedInLinks.map(({ title, path, id }) => (
                        <a
                          href={path}
                          key={title}
                          className={classes.linkText}
                          onClick={handleLogout}
                          id={id}
                        >
                          <ListItem button>
                            <ListItemText primary={title} />
                          </ListItem>
                        </a>
                      ))}
                    </>
                  ) : (
                    <>
                      {isNotLoggedInLinks.map(({ title, path }) => (
                        <a href={path} key={title} className={classes.linkText}>
                          <ListItem button>
                            <ListItemText primary={title} />
                          </ListItem>
                        </a>
                      ))}
                    </>
                  )}
                </List>
              </Hidden>
              <Hidden mdUp>
                <SideDrawer
                  navLinks={
                    user.isLoggedIn && user.role === 'Admin'
                      ? isLoggedInAsAdminLinks
                      : user.isLoggedIn
                      ? isLoggedInLinks
                      : isNotLoggedInLinks
                  }
                  handleLogout={handleLogout}
                />
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />

      <BackToTop>
        <Fab color="secondary" size="large" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </BackToTop>
    </>
  );
};

export default Navbar;
