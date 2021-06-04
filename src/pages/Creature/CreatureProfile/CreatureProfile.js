import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Api from 'helpers/api'
import Slide from '@material-ui/core/Slide';
import NpcFlavor from './components/NpcFlavor/NpcFlavor';
import MonsterFlavor from './components/MonsterFlavor/MonsterFlavor';
import ShareComponent from 'components/ShareComponent/ShareComponent';
import CreatureStats from './components/CreatureStats/CreatureStats';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    profileBox: {
        padding: "1rem",
        height: "100%"
    },
    title: {
        display: 'flex',
        alignItems: 'center'
    },
    link: {
        color: 'inherit',
        display: "flex",
        padding: ".2rem"
    },
    divider: {
        maxWidth: "50%",
        margin: "1rem auto"
    },
    fullWidthDivier: {
        margin: ".5rem 0"
    },
    image: {
        height: "35vh",
        float: "left",
        display: "block",
        margin: "0 1rem",
    }
});

const mapStateToProps = state => {
    return { npcs: state.npcs, monsters: state.monsters, profile: state.profile }
}

function CreatureProfile(props) {
    const { npcs, monsters, match } = props;
    const classes = useStyles();
    const [creature, setCreature] = useState();
    const [type, setType] = useState("npc");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editable, setEditable] = useState(false);
    const FlavorComponent = type === "npc" ? NpcFlavor : MonsterFlavor

    useEffect(() => {
        const type = match.url.includes("npc") ? "npc" : "bestiary";
        setType(type);

        if (type === "npc") {
            if (!npcs) {
                Api.fetchInternal('/npc/' + match.params.id)
                    .then(res => {
                        setCreature(res)
                    });
            } else {
                const selectedNpc = npcs.filter(npc => npc._id === match.params.id)[0];
                selectedNpc && setCreature(selectedNpc)
            }
        } else {
            if (!monsters) {
                Api.fetchInternal('/bestiary/' + match.params.id)
                    .then(res => setCreature(res))
            } else {
                const selectedMonster = monsters.filter(monster => monster._id === match.params.id)[0];
                selectedMonster && setCreature(selectedMonster)
            }
        }
    }, [npcs, monsters, match])

    useEffect(() => {
        if (creature) {
            if (creature.createdBy === props.profile?._id) {
                setEditable(true);
            }
        }
    }, [creature])

    const openDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                {creature &&
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={6}>
                            <FlavorComponent
                                history={props.history}
                                creature={creature}
                                type={type}
                                editable={editable}
                                openDialog={openDialog} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <CreatureStats                                
                                creature={creature} />
                        </Grid>
                    </Grid>
                }
                <ShareComponent
                    dialogOpen={dialogOpen}
                    openDialogFunc={setDialogOpen} />
            </div>
        </Slide>
    )
}


export default connect(mapStateToProps)(CreatureProfile);