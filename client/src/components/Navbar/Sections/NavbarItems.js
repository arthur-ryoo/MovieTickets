const isLoggedInLinks = [
  { title: 'movies', path: '/' },
  { title: 'log out', path: '/login', id: 'logout' },
];

const isLoggedInAsAdminLinks = [
  { title: 'admin', path: '/' },
  { title: 'log out', path: '/login', id: 'logout' },
];

const isNotLoggedInLinks = [
  { title: 'log in', path: '/login' },
  { title: 'sign up', path: '/signup' },
];

export { isLoggedInLinks, isNotLoggedInLinks, isLoggedInAsAdminLinks };
