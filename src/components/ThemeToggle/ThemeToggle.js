import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import useStyles from "./ThemeToggle.styles";

const ModeIcon = () => {
  const classes = useStyles();

  return (
    <svg
      className={classes.svg}
      xmlns="http://www.w3.org/2000/svg"
      width="472.39"
      height="472.39"
      viewBox="0 0 472.39 472.39"
    >
      <g className={classes.sun}>
        <path d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z" />
      </g>
      <g className={classes.circle}>
        <circle class="cls-1" cx="236.2" cy="236.2" r="103.78" />
      </g>
    </svg>
  );
};

export default function ThemeToggle({ darkMode, setDarkMode }) {

  return (
    <Tooltip title={`Cambia a modo ${darkMode ? "claro" : "oscuro"}`}>
      <IconButton onClick={() => setDarkMode(!darkMode)}>
        <ModeIcon />
      </IconButton>
    </Tooltip>
  );
}
