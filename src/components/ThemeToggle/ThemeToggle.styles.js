import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  svg: {
    width: 24,
    height: 24,
    fill: theme.palette.grey["200"],
  },
  circle: {
    transition: "transform 500ms ease-out",
    transform: theme.palette.type === "light" ? "translateX(-15%)" : "",
  },
  sun: {
    transformOrigin: "center center",
    transition: "transform 750ms cubic-bezier(0.11, 0.14, 0.29, 1.32)",
    transform: theme.palette.type === "light" ? "rotate(0.5turn)" : "",
  },
}));

export default useStyles;
