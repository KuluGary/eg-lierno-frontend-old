import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    "&:hover": {
      textDecoration: 'none'
    },
    textDecoration: 'none',
    cursor: "pointer"
  },
  table: {
    width: "100%"
  }
}));

export default useStyles;