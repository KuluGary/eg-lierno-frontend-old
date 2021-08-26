import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addCharacters, addProfile } from "shared/actions/index";
import { Slide, Paper, Typography, Box, Tabs, Tab, IconButton, Divider, CircularProgress } from "@material-ui/core";
import { Add as AddIcon, Backup as BackupIcon } from "@material-ui/icons";
import Api from "helpers/api";
import CharacterTable from "./components/CharacterTable";
import CreatureTable from "pages/Creature/CreatureList/components/CreatureTable";
import character_template from "assets/json/character_template.json";
import { DropzoneDialog } from "material-ui-dropzone";
import SEO from "components/SEO/SEO";
import { useHistoryState } from "hooks/useHistoryState";

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

  useEffect(() => {
    const fetchItems = async () => {
      const apiChars = {};
      await Api.fetchInternal("/characters").then((res) => {
        if (!!res) {
          apiChars["userCharacters"] = res;
        }
      });

      await Api.fetchInternal("/dm-characters").then((res) => {
        if (!!res) {
          apiChars["dmCharacters"] = res;
        }
      });

      await Api.fetchInternal("/fav-npc").then((res) => {
        if (!!res) {
          apiChars["favNpcs"] = res;
        }
      });

      if (Object.keys(apiChars) > 0) {
        props.addCharacters(apiChars);
      }

      setCharacters(apiChars);
    };

    fetchItems();
  }, []);

  useEffect(() => {
    setProfile(props.profile);
  }, [props.profile]);

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

  if (Object.keys(characters).length <= 0) {
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
