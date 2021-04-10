import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '133.33%', // 3:4
  },
  cardContent: {
    flexGrow: 1,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  chip: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  pagination: {
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
  previous: {
    marginRight: theme.spacing(1),
  },
  next: {
    marginLeft: theme.spacing(1),
  },
  sortBy_search: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default useStyles;
