import React from "react";
import useStyles from "./SimpleFlavor.styles";
import Image from "components/Image/Image";
import Tooltip from "components/Tooltip/Tooltip";
import { StringUtil } from "helpers/string-util";

import { useTheme } from "@material-ui/core/styles";
import { Typography, Box, Divider, Paper, IconButton, Menu, MenuItem } from "@material-ui/core";
import {
  ArrowBackIos as ArrowBackIosIcon,
  Dashboard as DashboardIcon,
  GetApp as GetAppIcon,
  Share as ShareIcon,
} from "@material-ui/icons";

export default function SimpleFlavor({ character, history, editable, openDialog }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const jsonToDownload = { ...character };
  delete jsonToDownload._id;
  delete jsonToDownload.player;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const createStringDefinition = () => {
    let classes = "";

    if (character.stats.classes.length > 0) {
      classes = character.stats.classes
        .map((charClasses) => {
          const classString =
            StringUtil.generizaClase(charClasses["className"], character.flavor.traits.pronoun) +
            " nivel " +
            charClasses["classLevel"];
          let subclassString = "";

          if (charClasses["subclassName"]) {
            subclassString = `( ${charClasses["subclassName"]} )`;
          }

          return classString + " " + subclassString;
        })
        .join(" / ");
    } else {
      classes = `${StringUtil.generizaClase("Novato", character.flavor.traits.pronoun)} nivel 0`;
    }

    return classes;
  };

  return (
    <Paper variant="outlined" className={classes.profileBox}>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <a
            className={classes.link}
            href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(jsonToDownload))}`}
            download={`${character._id}.json`}
          >
            JSON
          </a>
        </MenuItem>
      </Menu>
      <Box>
        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant={"h2"} className={classes.title}>
            <IconButton onClick={history.goBack} className={classes.link}>
              <ArrowBackIosIcon />
            </IconButton>
            <Box component="span" style={{ height: "100%" }}>
              {character.name}
            </Box>
          </Typography>
          <Box>
            <Tooltip title="Ir al modo Ficha Avanzada">
              <IconButton onClick={() => history.push(`/characters/advanced/${character._id}`)}>
                <DashboardIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Descarga este personaje">
              <IconButton onClick={handleClick} disabled={!editable}>
                <GetAppIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Compartir personaje">
              <IconButton onClick={openDialog}>
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Typography variant={"subtitle1"}>
          {character.stats.race?.name &&
            character.stats.race.name +
              (character.stats.background?.name ? " " + character.stats.background.name : "") +
              ", "}
          {createStringDefinition()}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Image
        className={classes.image}
        mode="modal"
        usage="avatar"
        style={{
          border: `1px solid ${theme.palette.divider}`,
          float: "left",
          margin: ".5rem 1rem",
          marginLeft: 0,
          minWidth: "11rem",
          minHeight: "15rem",
          borderRadius: 4,
        }}
        ariaLabel={`Retrato de ${character.name}`}
        src={character.flavor.portrait?.original}
      />
      <Box component="p" style={{ textAlign: "justify" }}>
        {character?.flavor.psychologicalDescription && (
          <Box component="p">
            <Typography variant="subtitle1">{"Descripción psicológica"}</Typography>
            <Divider style={{ marginBottom: ".6rem" }} />
            <span dangerouslySetInnerHTML={{ __html: StringUtil.parseHTML(character.flavor.psychologicalDescription) }} />
          </Box>
        )}
        {character?.flavor.physicalDescription && (
          <Box component="p">
            <Typography variant="subtitle1">{"Descripción física"}</Typography>
            <Divider style={{ marginBottom: ".6rem" }} />
            <span dangerouslySetInnerHTML={{ __html: StringUtil.parseHTML(character?.flavor.physicalDescription) }} />
          </Box>
        )}
        {character?.flavor.backstory && (
          <Box component="p">
            <Typography variant="subtitle1">{"Historia"}</Typography>
            <Divider style={{ marginBottom: ".6rem" }} />
            <span dangerouslySetInnerHTML={{ __html: StringUtil.parseHTML(character.flavor.backstory) }} />
          </Box>
        )}
      </Box>
    </Paper>
  );
}
