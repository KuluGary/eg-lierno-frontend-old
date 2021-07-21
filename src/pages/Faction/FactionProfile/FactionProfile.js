import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Paper, TextField } from "@material-ui/core";
import Api from "helpers/api";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { Table, TableBody, TableRow, TableCell, TableFooter, TablePagination } from "@material-ui/core";
import { connect } from "react-redux";
import { StringUtil } from "helpers/string-util";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import Grow from "@material-ui/core/Grow";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Alert from "@material-ui/lab/Alert";
import { useQuery } from "@apollo/client";
import Image from "components/Image/Image";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import { MEMBER_LIST } from "helpers/graphql/queries/faction";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    verticalAlign: "center",
  },
  link: {
    color: "inherit",
    alignSelf: "flex-end",
  },
  game: {
    marginLeft: "2rem",
  },
  profileBox: {
    margin: "1rem .5rem",
    height: "100%",
    padding: "1rem",
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderRadius: "50%",
  },
}));

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    campaigns: state.campaigns,
  };
};

const CharacterTable = ({ faction, dense, history, profile }) => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const location = useLocation();

  console.log(faction.members);
  const theme = useTheme();
  const { data, loading, error } = useQuery(MEMBER_LIST, {
    variables: {
      npcIds: faction.members?.npcs?.map((member) => member.id),
      characterIds: faction.members?.characters?.map((member) => member.id),
      monsterIds: faction.members?.monsters?.map((member) => member.id),
    },
  });

  useEffect(() => {
    if (!loading && !error) {
      setCharacters([
        ...data.get_characters_by_id.characters.map((item) => {
          return { ...item, type: "characters" };
        }),
        ...data.get_npcs_by_id.npcs
          .filter((item) => filterOutLockedItems(item))
          .map((item) => {
            return { ...item, type: "npc" };
          }),
        ...data.get_monsters_by_id.monsters
          .filter((item) => filterOutLockedItems(item))
          .map((item) => {
            return { ...item, type: "bestiary" };
          }),
      ]);
    }
  }, [data]);

  const filterOutLockedItems = (item) => {
    const createdBy = item.createdBy;

    if (createdBy === profile._id) {
      return true;
    }

    if (isLockedItem(item)) {
      return false;
    }
  };

  const isLockedItem = (item) => {
    if (Object.keys(item.flavor).includes("campaign")) {
      return !item.flavor?.campaign?.filter((item) => item.campaignId === location.campaignId)[0]?.unlocked;
    }

    return false;
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Box style={{ textAlign: "center" }}>
          <ErrorIcon fontSize="large" />
          <Typography variant="h6">Error cargando los datos</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Table>
      <TableBody>
        {characters.length > 0 &&
          characters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((character) => {
            return (
              <TableRow hover style={{ opacity: !isLockedItem(character) ? 1 : 0.5 }}>
                <TableCell style={{ padding: !dense ? "1.5rem" : ".5rem" }}>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    {!dense && (
                      <Image
                        mode="background"
                        usage="avatar"
                        src={character.flavor?.portrait?.avatar}
                        ariaLabel={`Avatar de ${character.name}`}
                        containerStyle={{
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: "100%",
                          width: "4vw",
                          height: "4vw",
                        }}
                        style={{
                          backgroundImage: `url(${character.flavor?.portrait?.avatar})`,
                          width: "4vw",
                          height: "4vw",
                          backgroundSize: "cover",
                          borderRadius: "100%",
                        }}
                      />
                    )}
                    <Box style={{ margin: "0 1rem" }}>
                      <Box component="div">
                        <Typography variant="body1" style={{ fontWeight: "500", fontSize: "1rem" }}>
                          {character.flavor?.traits?.name || character.name}
                        </Typography>
                      </Box>
                      <Box component="div">
                        <Typography variant="caption">
                          {character.stats?.race && character.stats?.classes ? (
                            <>
                              {character.stats?.race &&
                                character.stats.race?.name &&
                                StringUtil.generizaClase(character.stats.race?.name, character.flavor.pronoun) + ", "}
                              {character.stats?.classes
                                ?.map(
                                  (charClass) =>
                                    `${StringUtil.generizaClase(
                                      charClass.className,
                                      character.flavor.traits.pronoun,
                                    )} (${charClass.classLevel})`,
                                )
                                .join(", ")}
                            </>
                          ) : (
                            <>
                              {[character.stats?.race, character.flavor?.class].filter((item) => item).join(", ")}
                              <br />
                              {"Dificultad " +
                                character.stats?.challengeRatingStr +
                                (character.stats?.experiencePoints &&
                                  " (" + character.stats?.experiencePoints + " XP)")}
                            </>
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell style={{ cursor: "pointer" }} align="right">
                  <IconButton onClick={() => history.push(`/${character.type}/${character._id}`)}>
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            colSpan={12}
            labelRowsPerPage={"Filas por página: "}
            labelDisplayedRows={({ from, to, count }) => {
              return "" + from + "-" + to + " de " + count;
            }}
            count={characters.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

function FactionProfile(props) {
  const classes = useStyles();
  const [faction, setFaction] = useState();
  const [dense, setDense] = useState(false);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    Api.fetchInternal("/factions/" + props.match.params.id).then((res) => {
      const factions = res;
      setFaction(factions);
    });
  }, []);

  const save = () => {
    Api.fetchInternal("/factions/" + faction._id, {
      method: "PUT",
      body: JSON.stringify(faction),
    }).then(() => setEdited(false));
  };

  const getMemberCount = (memberObj) => {
    let count = 0;

    if (memberObj) {
      Object.keys(memberObj).forEach((key) => {
        memberObj[key].forEach(() => count++);
      });
    }

    return count;
  };

  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <Grid container spacing={2} style={{ padding: 10 }}>
        {faction && (
          <>
            <Grid item xs={12} component={Paper} variant="outlined" style={{ padding: "1rem .5rem" }}>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Box style={{ margin: "0 .5rem" }}>
                    <IconButton onClick={props.history.goBack} className={classes.link}>
                      <ArrowBackIosIcon />
                    </IconButton>
                  </Box>
                  <Box style={{ margin: "0 1rem 0 0" }}>
                    <Image
                      mode="modal"
                      src={faction.image}
                      ariaLabel={`Avatar de ${faction.name}`}
                      className={classes.avatar}
                      errorStyle={{
                        height: "3vw",
                        width: "3vw",
                        borderRadius: "100%",
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h5" inline>
                      {faction.name}
                    </Typography>
                    <Typography variant="caption" inline>
                      {"Número de miembros: " + getMemberCount(faction.members)}
                    </Typography>
                  </Box>
                </Box>
                <Box style={{ display: "flex" }}>
                  <IconButton onClick={() => {}}>
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton onClick={() => {}}>
                    <ShareIcon />
                  </IconButton>
                  {edited && (
                    <Grow in={true} mountOnEnter unmountOnExit>
                      <Alert
                        variant="filled"
                        severity="warning"
                        action={
                          <IconButton size="small" onClick={save}>
                            <SaveIcon />
                          </IconButton>
                        }
                      >
                        Tienes cambios sin guardar. Por favor, guarda antes de salir de la página.
                      </Alert>
                    </Grow>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={7} style={{ padding: 0 }}>
              <Paper variant="outlined" className={classes.profileBox} style={{ marginLeft: 0 }}>
                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Miembros</Typography>
                  <IconButton onClick={() => setDense(!dense)}>
                    {dense ? <FullscreenIcon /> : <FullscreenExitIcon />}
                  </IconButton>
                </Box>
                {faction && <CharacterTable faction={faction} dense={dense} {...props} />}
              </Paper>
            </Grid>
            <Grid item xs={5} style={{ padding: 0 }}>
              <Paper variant="outlined" className={classes.profileBox} style={{ marginRight: 0 }}>
                <Typography variant="h6">Descripción</Typography>
                <TextField
                  disabled={props.profile?._id !== faction.founder}
                  variant="outlined"
                  multiline
                  fullWidth
                  value={faction.description}
                  onChange={(event) => {
                    const newFaction = { ...faction };
                    newFaction["description"] = event.target.value;
                    setFaction(newFaction);
                    setEdited(true);
                  }}
                  inputProps={{
                    style: { minHeight: "92.5%", fontSize: "11px" },
                  }}
                />
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </Slide>
  );
}

export default connect(mapStateToProps)(FactionProfile);
