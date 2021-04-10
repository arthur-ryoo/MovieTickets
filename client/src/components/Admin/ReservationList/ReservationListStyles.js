import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    textAlign: 'center',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 145,
  },
  container: {
    marginTop: theme.spacing(4),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
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
}));

export default useStyles;
