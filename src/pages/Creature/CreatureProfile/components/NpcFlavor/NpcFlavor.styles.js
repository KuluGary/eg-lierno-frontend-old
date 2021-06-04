import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  profileBox: {
    padding: "1rem",
    height: "90vh",
    overflow: "auto",
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar': {
      width: 0
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'none !important',
      backgroundColor: 'transparent !important',
      width: 0
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: "transparent !important",
      width: 0
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  },
  link: {
    color: 'inherit',
    display: "flex",
    padding: ".2rem"
  },
  divider: {
    maxWidth: "50%",
    margin: "1rem auto"
  },
  fullWidthDivier: {
    margin: ".5rem 0"
  },
  image: {
    height: "35vh",
    float: "left",
    display: "block",
    margin: "0 1rem"
  }
});

export default useStyles;