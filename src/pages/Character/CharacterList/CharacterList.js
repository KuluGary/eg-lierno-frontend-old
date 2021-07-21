import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addCharacters, addProfile } from "shared/actions/index";
import { Slide, Paper, Typography, Box, Tabs, Tab, IconButton, Divider, CircularProgress } from "@material-ui/core";
import { Add as AddIcon, Backup as BackupIcon, Error as ErrorIcon } from "@material-ui/icons";
import Api from "helpers/api";
import CharacterTable from "./components/CharacterTable";
import CreatureTable from "pages/Creature/CreatureList/components/CreatureTable";
import character_template from "../../../assets/json/character_template.json";
import { DropzoneDialog } from "material-ui-dropzone";
import SEO from "components/SEO/SEO";
import { useHistoryState } from "hooks/useHistoryState";
import { CHAR_LIST_QUERY } from "helpers/graphql/queries/characters";
import { useQuery } from "@apollo/client";

const mapStateToProps = (state) => {
  return {
    characters: state.characters,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCharacters: (characters) => dispatch(addCharacters(characters)),
    addProfile: (profile) => dispatch(addProfile(profile)),
  };
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CharacterList(props) {
  const [characters, setCharacters] = useState({});
  const [profile, setProfile] = useState([]);
  const [page, setPage] = useHistoryState("page", 0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = useHistoryState("value", 0);
  const [open, setOpen] = useState(false);
  const { data, isLoading, error, refetch } = useQuery(CHAR_LIST_QUERY);

  useEffect(() => {
    const apiChars = {};

    if (!props.characters) {
      if (data?.get_user_characters.characters && !data?.get_user_characters.errors) {
        apiChars["userCharacters"] = data?.get_user_characters.characters;
      }

      if (data?.get_dm_characters.characters && !data?.get_dm_characters.errors) {
        apiChars["dmCharacters"] = data?.get_dm_characters.characters;
      }

      if (data?.get_favorite_npcs.npcs && !data?.get_favorite_npcs.errors) {
        apiChars["favNpcs"] = data?.get_favorite_npcs.npcs;
      }

      if (Object.keys(apiChars) > 0) {
        props.addCharacters(apiChars);
      }
    } else {
      apiChars["userCharacters"] = props.userCharacters;
      apiChars["dmCharacters"] = props.dmCharacters;
      apiChars["favNpcs"] = props.favNpcs;
    }

    setCharacters(apiChars);
  }, [data, setCharacters]);

  useEffect(() => {
    setProfile(props.profile);
  }, [props.profile]);

  useEffect(() => {
    refetch();
  }, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const addCharacter = (character = null) => {
    let newCharacter;

    if (!character) {
      newCharacter = character_template;
    } else {
      newCharacter = { ...character };
      delete newCharacter._id;
      newCharacter.player = profile._id;
    }

    Api.fetchInternal("/characters", {
      method: "POST",
      body: JSON.stringify(newCharacter),
    }).then((id) => {
      Api.fetchInternal("/characters").then((res) => {
        props.addCharacters(res);
        setCharacters(res);

        if (!character) {
          props.history.push("/characters/" + id);
        }
      });
    });
  };

  const handleSave = (files) => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = (e) => {
        addCharacter(JSON.parse(e.target.result));
        handleToggle();
      };
    });
  };

  const deleteCharacter = (characterData) => {
    Api.fetchInternal("/characters/" + characterData, {
      method: "DELETE",
    }).then(() => {
      Api.fetchInternal("/characters").then((res) => {
        props.addCharacters(res);
        setCharacters(res);
      });
    });
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  if (isLoading) {
    return (
      <Paper variant="outlined" style={{ height: "80vh" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      </Paper>
    );
  }

  if (error || Api.hasApolloErrors(data)) {
    return (
      <Paper variant="outlined" style={{ height: "80vh" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box style={{ textAlign: "center" }}>
            <ErrorIcon fontSize="large" />
            <Typography variant="h6">Error cargando los datos</Typography>
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <>
      {characters && (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <Paper variant="outlined">
            <SEO>
              <title>{"Personajes | Lierno App"}</title>
            </SEO>
            <DropzoneDialog
              open={open}
              dropzoneText={"Arrastra un fichero de personaje"}
              dialogTitle={"Sube un fichero de personaje"}
              cancelButtonText={"Cancelar"}
              submitButtonText={"Guardar"}
              onSave={handleSave}
              acceptedFiles={["application/JSON"]}
              maxFileSize={5000000}
              onClose={handleToggle}
            />
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Mis Personajes" {...a11yProps(0)} />
                <Tab label="Personajes de mis Campañas" {...a11yProps(1)} />
                <Tab label="Mis favoritos" {...a11yProps(2)} />
              </Tabs>
              <Box>
                <IconButton onClick={handleToggle}>
                  <BackupIcon />
                </IconButton>
                <IconButton onClick={() => addCharacter()}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            <Divider />
            <TabPanel value={value} index={0}>
              {characters && characters.userCharacters?.length > 0 && (
                <CharacterTable
                  characters={characters.userCharacters}
                  profile={profile}
                  page={page}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  history={props.history}
                  deleteCharacter={deleteCharacter}
                  rowsPerPage={rowsPerPage}
                  index={0}
                  value={value}
                />
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {characters && characters.dmCharacters?.length > 0 && (
                <CharacterTable
                  characters={characters.dmCharacters}
                  profile={profile}
                  page={page}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  rowsPerPage={rowsPerPage}
                  history={props.history}
                  index={1}
                  value={value}
                />
              )}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {characters && characters.favNpcs?.length > 0 && (
                <CreatureTable
                  creaturesToDisplay={characters.favNpcs}
                  campaign={null}
                  profile={profile}
                  dm={null}
                  history={props.history}
                  deleteCreature={() => {}}
                  type={"npc"}
                />
              )}
            </TabPanel>
          </Paper>
        </Slide>
      )}
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
