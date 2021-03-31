import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
  },
  footer: {
    padding: theme.spacing(3, 2),
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
    textAlign: 'center',
  },
}));

export default useStyles;
