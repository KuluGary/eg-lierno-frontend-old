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
                                            character={true}
                                            stats={character["stats"]["abilityScores"]}
                                            modifiers={character["stats"]["abilityScoreModifiers"]} />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={2}>
                                        <Proficiency
                                            proficiency={character["stats"]["proficiencyBonus"]} />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={2}>
                                        <Speed
                                            speed={character["stats"]['speed']} />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={2}>
                                        <Armor
                                            ac={character["stats"]["armorClass"]} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <HitPoints
                                            hp={character["stats"]["hitPoints"]} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Attacks
                                            attacks={character["stats"]["attacks"]}
                                            numAttacks={character["stats"]["numAttacks"]} />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <SavingThrows
                                            saving={character["stats"]["savingThrows"]} />

                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} container direction="row">
                                    <Grid item xs={12}>
                                        <Skills
                                            skills={character["stats"]["skills"]}
                                            stats={character["stats"]["abilityScoreModifiers"]}
                                            proficiency={character["stats"]["proficiencyBonus"]} />

                                    </Grid>
                                </Grid>
                            {/* </Box> */}
                    </Grid>
                </>
            }
        </div>
    );
}