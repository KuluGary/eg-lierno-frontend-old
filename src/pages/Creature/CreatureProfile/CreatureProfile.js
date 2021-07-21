import React, { useState, useEffect } from "react";
import { addProfile } from "shared/actions/index";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Api from "helpers/api";
import { Grid, Paper, CircularProgress } from "@material-ui/core";
import NpcFlavor from "./components/NpcFlavor/NpcFlavor";
import MonsterFlavor from "./components/MonsterFlavor/MonsterFlavor";
import ShareComponent from "components/ShareComponent/ShareComponent";
import CreatureStats from "./components/CreatureStats/CreatureStats";
import SEO from "components/SEO/SEO";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  profileBox: {
    padding: "1rem",
    height: "100%",
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "inherit",
    display: "flex",
    padding: ".2rem",
  },
  divider: {
    maxWidth: "50%",
    margin: "1rem auto",
  },
  fullWidthDivier: {
    margin: ".5rem 0",
  },
  image: {
    height: "35vh",
    float: "left",
    display: "block",
    margin: "0 1rem",
  },
});

const mapStateToProps = (state) => {
  return { npcs: state.npcs, monsters: state.monsters, character: state.characters, profile: state.profile };
};

const mapDispatchToProps = (dispatch) => ({
  addProfile: (profile) => dispatch(addProfile(profile)),
});

function CreatureProfile(props) {
  const { npcs, monsters, characters, match } = props;
  const classes = useStyles();
  const [creature, setCreature] = useState();
  const [type, setType] = useState("npc");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const FlavorComponent = type === "bestiary" ? MonsterFlavor : NpcFlavor;

  useEffect(() => {
    setIsLoading(true);
    let type = "character";
    if (match.url.includes("npc")) {
      type = "npc";
    } else if (match.url.includes("bestiary")) {
      type = "bestiary";
    }

    setType(type);

    switch (type) {
      case "npc":
        if (!npcs) {
          Api.fetchInternal("/npc/" + match.params.id).then((res) => {
            setCreature(res);
            setIsLoading(false);
          });
        } else {
          const selectedNpc = npcs.filter((npc) => npc._id === match.params.id)[0];
          selectedNpc && setCreature(selectedNpc);
          setIsLoading(false);
        }
        break;
      case "bestiary":
        if (!monsters) {
          Api.fetchInternal("/bestiary/" + match.params.id).then((res) => {
            setCreature(res);
            setIsLoading(false);
          });
        } else {
          const selectedMonster = monsters.filter((monster) => monster._id === match.params.id)[0];
          selectedMonster && setCreature(selectedMonster);
          setIsLoading(false);
        }
        break;
      default:
        if (!characters) {
          Api.fetchInternal("/characters/" + match.params.id).then((res) => {
            if (res.type === "advanced") {
            } else {
              setCreature(res);
              setIsLoading(false);
            }
          });
        } else {
          const selectedCharacter = characters.filter((character) => character._id === match.params.id)[0];
          selectedCharacter && setCreature(selectedCharacter);
          setIsLoading(false);
        }
    }
  }, [npcs, monsters, characters, match]);

  useEffect(() => {
    if (creature) {
      if (creature.createdBy === props.profile?._id) {
        setEditable(true);
      }
    }
  }, [creature]);

  const openDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const updateProfile = (profile) => {
    props.addProfile(profile);
  };

  if (isLoading) {
    return (
      <Paper variant="outlined" style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="default" style={{ margin: "1rem" }} />
      </Paper>
    );
  }

  return (
    <div className={classes.root}>
      {creature && (
        <Grid container spacing={1}>
          <SEO>
            <title>{`${creature.name} | Lierno App`}</title>
          </SEO>
          <Grid item xs={12} sm={12} md={6}>
            <FlavorComponent
              history={props.history}
              creature={creature}
              type={type}
              editable={editable}
              openDialog={openDialog}
              profile={props.profile}
              updateProfile={updateProfile}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CreatureStats creature={creature} />
          </Grid>
        </Grid>
      )}
      <ShareComponent dialogOpen={dialogOpen} openDialogFunc={setDialogOpen} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatureProfile);
