import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '133.33%',
  },
  cardContent: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));

export default useStyles;
