import React, { useEffect, useState } from "react";
import { Paper, Typography, Box, Grow, Divider, IconButton, Menu, MenuItem } from "@material-ui/core";
import {
  Save as SaveIcon,
  Share as ShareIcon,
  GetApp as GetAppIcon,
  ArtTrack as ArtTrackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { StringUtil } from "helpers/string-util";
import { useWidth } from "hooks/media-query";
import Image from "components/Image/Image";
import Tooltip from "components/Tooltip/Tooltip";
import useStyles from "./CharacterInfo.styles";
import Api from "helpers/api";

export default function CharacterInfo(props) {
  const classes = useStyles();
  const width = useWidth();
  const { name, image, race, charClass, openDialog, playerId, character } = props;
  const jsonToDownload = { ...character };
  delete jsonToDownload._id;
  delete jsonToDownload.player;
  const [player, setPlayer] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    Api.fetchInternal("/auth/users/" + playerId).then((res) => setPlayer(res));
  }, [props.race]);

  const createStringDefinition = () => {
    let classes = "";

    if (charClass.length > 0) {
      classes = charClass
        .map((charClasses) => {
          const classString =
            StringUtil.generizaClase(charClasses["className"], props.pronoun) + " nivel " + charClasses["classLevel"];
          let subclassString = "";

          if (charClasses["subclassName"]) {
            subclassString = `( ${charClasses["subclassName"]} )`;
          }

          return classString + " " + subclassString;
        })
        .join(" / ");
    } else {
      classes = `${StringUtil.generizaClase("Novato", props.pronoun)} nivel 0`;
    }

    return classes;
  };

  return (
    <div className={classes.root}>
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
      <Paper variant="outlined">
        <Box className={classes.paper}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Image
              mode="background"
              usage="avatar"
              src={image}
              containerStyle={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "100%",
              }}
              style={{
                backgroundImage: `url(${image})`,
                width: "3vw",
                height: "3vw",
                backgroundSize: "cover",
                borderRadius: "100%",
              }}
              ariaLabel={`Retrato de ${name}`}
            />
            <Box className={classes.info}>
              <Box>
                <Typography variant="h6">{name}</Typography>
              </Box>
              {player ? (
                <Box component="span">{width === "xs" ? player.username : "Personaje de " + player.username}</Box>
              ) : (
                ""
              )}
              <br />
              <Box component="span">
                {race?.name && race.name + ", "}
                {createStringDefinition()}
              </Box>
              <Box></Box>
            </Box>
          </Box>
          <Box style={{ display: "flex" }}>
            <Box>
              <Tooltip title="Ir al modo Ficha Simple">
                <IconButton onClick={() => props.history.push(`/characters/simple/${character._id}`)}>
                  <ArtTrackIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Descarga este personaje">
                <IconButton onClick={handleClick} disabled={!props.editable}>
                  <GetAppIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Compartir personaje">
                <IconButton onClick={openDialog}>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </Box>
            {props.edited && (
              <Grow in={true} mountOnEnter unmountOnExit>
                {width !== "xs" ? (
                  <Alert
                    variant="filled"
                    severity="warning"
                    action={
                      <IconButton size="small" onClick={props.save}>
                        <SaveIcon />
                      </IconButton>
                    }
                  >
                    {width !== "xs" && "Tienes cambios sin guardar. Por favor, guarda antes de salir de la página."}
                  </Alert>
                ) : (
                  <IconButton size="small" onClick={props.save}>
                    <SaveIcon />
                  </IconButton>
                )}
              </Grow>
            )}
          </Box>
        </Box>
        <Divider />
        {props.children}
      </Paper>
    </div>
  );
}
