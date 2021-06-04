import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  table: {
    width: "100%"
  },
  avatar: {
    width: "20%",
    height: "20%",
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
  addButton: {
    padding: 8,
    float: "right"
  },
  searchContainer: {
    display: "flex",
    justifyContent: "space-between",
    position: "absolute",
    top: "0",
    right: ".5rem",
    alignItems: "center",
    width: "25%"
  },
  formControl: {
    margin: "1rem 1.2rem"
  }
}));

export default useStyles;