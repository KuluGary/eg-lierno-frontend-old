import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Api from "helpers/api";
import Box from "@material-ui/core/Box";
import Image from "components/Image/Image";
import { Table, TableBody, Typography, TableRow, TableCell, IconButton } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { StringUtil } from "helpers/string-util";

const useStyles = makeStyles((theme) => ({
  profileBox: {
    margin: "0 auto",
    padding: "1rem",
    height: "100%",
  },
  dataBox: {
    display: "flex",
    alignItems: "center",
  },
  name: {
    // margin: "1rem"
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    campaigns: state.campaigns,
  };
};

function CampaignProfile(props) {
  const classes = useStyles();
  const [dm, setDm] = useState();
  const [players, setPlayers] = useState();
  const [characters, setCharacters] = useState();
  const [logs, setLogs] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    Api.fetchInternal("/auth/players", {
      method: "POST",
      body: JSON.stringify({
        dmId: props.dm,
        userIds: props.players,
      }),
    }).then((res) => {
      setDm(res.dm);
      setPlayers(res.players);
    });

    Api.fetchInternal("/characterinfo", {
      method: "POST",
      body: JSON.stringify({
        characterIds: props.characters,
      }),
    }).then((res) => {
      setCharacters(res.characters);
    });
  }, []);

  useEffect(() => {
    if (characters && players) {
      Api.fetchInternal("/logs/" + props.campaignId).then((res) => setLogs(res));
    }
  }, [characters, players]);

  useEffect(() => {
    if (characters && players && logs.length > 0) {
      const data = [];
      const userData = {};

      logs.forEach((log) => {
        log.data &&
          Object.keys(log.data?.damageDealt).forEach((key) => {
            if (key !== dm.metadata.discordId) {
              userData[key] = userData[key]
                ? [...userData[key], ...log.data.damageDealt[key]]
                : [...log.data.damageDealt[key]];
            }
          });
      });

      Object.keys(userData).forEach((key) => {
        userData[key] = userData[key].sort((a, b) => new Date(a.date) - new Date(b.date));
      });

      Object.keys(userData).forEach((key) => {
        const entry = userData[key];
        const user = players.filter((player) => player.metadata.discordId === key)[0];
        const userId = user.id;
        const char = characters.filter((character) => character.player === userId)[0];

        const collection = {
          id: char.name,
          color: "hsl(63, 70%, 50%)",
          data: [],
        };

        entry.forEach((step) => {
          if (collection.data.findIndex((item) => item.x === step.date.split(" ")[0]) >= 0) {
            const index = collection.data.findIndex((item) => item.x === step.date.split(" ")[0]);

            collection.data[index].y += step.damage;
          } else {
            collection.data.push({
              x: step.date.split(" ")[0],
              y: step.damage + (collection.data.length > 0 ? collection.data[collection.data.length - 1].y : 0),
            });
          }
        });

        data.push(collection);
      });
    }
  }, [characters, players, logs]);

  const getPlayerByUsername = (userId) => {
    if (dm?.id === userId) {
      return dm.name;
    }

    const selectedPlayer = players?.filter((player) => player.id === userId)[0];

    if (selectedPlayer) {
      return selectedPlayer.name;
    }

    return undefined;
  };

  return (
    <>
      <Grid item lg={7} xs={12}>
        <Paper variant="outlined" className={classes.profileBox}>
          <Typography variant="h6" style={{ marginBottom: ".5rem" }}>
            Personajes
          </Typography>
          <Table>
            <TableBody>
              {dm && (
                <TableRow>
                  <TableCell colSpan={2} style={{ padding: ".5rem" }}>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          mode="background"
                          usage="avatar"
                          src={dm.metadata.avatar}
                          containerStyle={{
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: "100%",
                            width: "3vw",
                            height: "3vw",
                          }}
                          style={{
                            backgroundImage: `url(${dm.metadata.avatar})`,
                            width: "3vw",
                            height: "3vw",
                            backgroundSize: "cover",
                            borderRadius: "100%",
                          }}
                          ariaLabel={`Avatar de ${dm.username}`}
                        />
                        <Box style={{ margin: "0 1rem" }}>
                          <Box component="div">
                            <Typography
                              variant="body1"
                              style={{
                                fontWeight: "500",
                                fontSize: "1rem",
                              }}
                            >
                              {dm.name}
                            </Typography>
                          </Box>
                          <Box component="div">
                            <Typography variant="caption">{"Dungeon Master"}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {characters &&
                characters.map((char) => {
                  return (
                    <TableRow hover>
                      <TableCell style={{ padding: ".5rem" }}>
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              mode="background"
                              usage="avatar"
                              src={char.flavor.portrait?.avatar}
                              containerStyle={{
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: "100%",
                                width: "3vw",
                                height: "3vw",
                              }}
                              style={{
                                backgroundImage: `url(${char.flavor.portrait?.avatar})`,
                                width: "3vw",
                                height: "3vw",
                                backgroundSize: "cover",
                                borderRadius: "100%",
                              }}
                              ariaLabel={char.name}
                            />
                            <Box
                              style={{
                                margin: "0 1rem",
                              }}
                            >
                              <Box component="div">
                                <Typography
                                  variant="body1"
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "1rem",
                                  }}
                                >
                                  {char.flavor.traits.name}
                                </Typography>
                              </Box>
                              <Box component="div">
                                <Typography variant="caption">
                                  {char.stats.race &&
                                    char.stats.race.name &&
                                    StringUtil.generizaClase(char.stats.race.name, props.pronoun) + ", "}
                                  {char.stats.classes
                                    .map(
                                      (charClass) =>
                                        `${StringUtil.generizaClase(
                                          charClass.className,
                                          char.flavor.traits.pronoun,
                                        )} (${charClass.classLevel})`,
                                    )
                                    .join(", ")}
                                </Typography>
                              </Box>
                              <Box component="div">
                                <Typography variant="caption">{getPlayerByUsername(char.player)}</Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align={"right"}>
                        <IconButton onClick={() => props.history.push(`/characters/${char._id}`)}>
                          <ArrowForwardIosIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <Box variant="div" className={classes.dataBox}></Box>
        </Paper>
      </Grid>
      <Grid item lg={5} xs={12}>
        <Paper variant="outlined" className={classes.profileBox}>
          <Typography variant="h6" style={{ marginBottom: "1rem" }}>
            Sinopsis
          </Typography>
          {props.description}
        </Paper>
      </Grid>
    </>
  );
}

export default connect(mapStateToProps)(CampaignProfile);
