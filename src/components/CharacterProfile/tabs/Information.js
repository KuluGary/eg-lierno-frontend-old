import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Stats from "../components/Stats";
import Proficiency from "../components/Proficiency";
import Speed from "../components/Speed";
import HitPoints from "../components/HitPoints";
import Armor from "../components/Armor";
import Attacks from "../components/Attacks";
import SavingThrows from '../components/SavingThrows';
import Skills from '../components/Skills';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        width: "100%"
    },
    container: {
        maxWidth: "45vw"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    },
    flexGrid: {
        display: "flex",
        width: "100%"
    }
});

export default function Information(props) {
    const classes = useStyles();
    const character = props.character;

    useEffect(() => {
    }, [])

    return (
        <div className={classes.root}>
            {character &&
                <>
                    <Grid container spacing={1}>
                            {/* <Box className={classes.flexGrid}> */}
                                <Grid item xs={12} sm={12} md={6} container direction="row">
                                    <Grid item xs={12}>
                                        <Stats
                                            stats={character["abilities_bonuses"][0]} />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={2}>
                                        <Proficiency
                                            proficiency={character["proficiency_bonus"]} />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={2}>
                                        <Speed
                                            speed={character["characteristics"][0]['speed']} />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={2}>
                                        <Armor
                                            ac={character["ac"]} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <HitPoints
                                            hp={character["hp"]} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Attacks
                                            attacks={character["attacks"]} />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <SavingThrows
                                            saving={character["save_bonuses"]} />

                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} container direction="row">
                                    <Grid item xs={12}>
                                        <Skills
                                            skills={character["skills"]} />

                                    </Grid>
                                </Grid>
                            {/* </Box> */}
                    </Grid>
                </>
            }
        </div>
    );
}