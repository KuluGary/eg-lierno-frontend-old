import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    "&:hover": {
      textDecoration: 'none'
    },
    cursor: "pointer"
  },
  table: {
    width: "100%"
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',

  },
}));

export default useStyles;