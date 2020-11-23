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
import Initiative from '../components/Initiative';
import Fate from '../components/Fate';
import Inspiration from '../components/Inspiration';
import HitDice from '../components/HitDice';
import DeathSaves from '../components/DeathSaves';
import Health from '../components/Health';
import Wounds from '../components/Wounds';
import Hunger from '../components/Hunger';
import Rations from '../components/Rations';
import Water from '../components/Water';
import SpellCasting from '../components/SpellCasting';
import Exhaustion from '../components/Exhaustion';
import SpellDC from '../components/SpellDC';
import SpellBonus from '../components/SpellBonus';
import ClassResource from '../components/ClassResource';
import OtherResource from '../components/OtherResource';
import SpellBurnout from '../components/SpellBurnout';
import Stress from '../components/Stress';
import StressLevels from '../components/StressLevels';
import Afflictions from '../components/Afflictions';
import ExhaustionEffects from '../components/ExhaustionEffects';
import Conditions from '../components/Conditions';
import OtherResources from '../components/OtherResources';
import { useWidth } from '../../../helpers/media-query';

import Grid from '@material-ui/core/Grid';
import PassivePerception from '../components/PassivePerception';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        width: "100%",
        paddingLeft: "4px"
        // paddingLeft: "4px"
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
    const width = useWidth();

    useEffect(() => {
    }, [])

    return (
        <div className={classes.root}>
            {character &&
                <>
                    <Grid container spacing={1}>
                        <Grid container item lg={3} style={{ paddingRight: 0 }}>
                            <Grid item lg={4} xs={12}>
                                <Stats
                                    character={true}
                                    stats={character["stats"]["abilityScores"]}
                                    changeStats={props.changeStats}
                                    modifiers={character["stats"]["abilityScoreModifiers"]}
                                    editable={props.editable} />
                            </Grid>
                            <Grid item lg={8} xs={12}>
                                <Box style={{ display: "flex", flexDirection: "column", height: "100%", }}>
                                    <Proficiency
                                        proficiency={props.proficiencyBonus}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                    <SavingThrows
                                        proficiency={props.proficiencyBonus}
                                        stats={character["stats"]["abilityScores"]}
                                        saving={character["stats"]["savingThrows"]}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                    <Skills
                                        skills={character["stats"]["skills"]}
                                        stats={character["stats"]["abilityScores"]}
                                        proficiency={props.proficiencyBonus}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container item lg={9} style={{ paddingLeft: 0 }}>
                            <Grid item lg={12} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                <Box style={{ display: "flex", flexDirection: width === "xs" ? "column" : "row" }}>
                                    <Box style={{ display: "flex", width: width === "xs" ? "100%" : "80%", alignItems: "stretch", flexWrap: width === "xs" ? "wrap" : "nowrap" }}>
                                        <Armor
                                            ac={character["stats"]["armorClass"]}
                                            changeStats={props.changeStats}
                                            editable={props.editable} />
                                        <Initiative
                                            initiative={character["stats"]["initiativeBonus"]}
                                            changeStats={props.changeStats}
                                            editable={props.editable} />
                                        <PassivePerception
                                            perception={character["stats"]["passivePerception"]}
                                            changeStats={props.changeStats}
                                            editable={props.editable} />
                                        <Speed
                                            speed={character["stats"]['speed']}
                                            changeStats={props.changeStats}
                                            editable={props.editable} />
                                    </Box>
                                    <Box style={{ display: "flex", flexDirection: "column", width: width === "xs" ? "100%" : "40%" }}>
                                        <Fate
                                            fatePoints={character["stats"]["fate_points"]}
                                            changeStats={props.changeStats}
                                            editable={props.editable} />
                                        <Inspiration
                                            inspiration={character["stats"]["inspiration"]}
                                            changeStats={props.changeStats}
                                            editable={props.editable} />
                                    </Box>
                                </Box>
                                <Grid container item lg={12}>
                                    <Grid container item lg={6} xs={12}>
                                        <Grid item lg={12}>
                                            <HitPoints
                                                hp={character["stats"]["hitPoints"]}
                                                changeStats={props.changeStats}
                                                editable={props.editable} />
                                        </Grid>
                                        <Grid item lg={8} xs={12}>
                                            <HitDice
                                                classes={character["stats"]["classes"]}
                                                hitDice={character["stats"]["hit_dice"]}
                                                changeStats={props.changeStats}
                                                editable={props.editable} />
                                        </Grid>
                                        <Grid item lg={4} xs={12}>
                                            <DeathSaves
                                                deathSaves={character["stats"]["death_saves"]}
                                                changeStats={props.changeStats}
                                                editable={props.editable} />
                                        </Grid>
                                    </Grid>
                                    <Grid container item lg={6} xs={12}>
                                        {(props.settings && props.settings.generalOptions.health) &&
                                            <Grid item lg={4} xs={12}>
                                                <Health
                                                    health={character["stats"]["healthStatus"]}
                                                    pronoun={character["flavor"]["traits"]["pronoun"]}
                                                    changeStats={props.changeStats}
                                                    editable={props.editable} />
                                            </Grid>
                                        }
                                        <Grid item lg={(props.settings && props.settings.generalOptions.health) ? 8 : 12} xs={12} style={{ minHeight: 200 }}>
                                            <Wounds
                                                wounds={character["stats"]["wounds"]}
                                                changeStats={props.changeStats}
                                                editable={props.editable} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {(props.settings && props.settings.generalOptions.survivalConditions) &&
                                    <Grid container item lg={12}>
                                        <Grid item lg={8}>
                                            <Hunger
                                                comfort={character["stats"]["comfort"]}
                                                pronoun={character["flavor"]["traits"]["pronoun"]}
                                                changeStats={props.changeStats}
                                                editable={props.editable}
                                                width={width} />
                                        </Grid>
                                        <Grid item lg={4} xs={12}>
                                            <Box style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                                <Rations
                                                    rations={character["stats"]["rations"]}
                                                    changeStats={props.changeStats}
                                                    editable={props.editable} />
                                                <Water
                                                    waterskin={character["stats"]["waterskin"]}
                                                    changeStats={props.changeStats}
                                                    editable={props.editable} />
                                                <Exhaustion
                                                    exhaustion={character["stats"]["exhaustion"]}
                                                    changeStats={props.changeStats}
                                                    editable={props.editable} />
                                            </Box>
                                        </Grid>
                                    </Grid>}
                                <Grid container item lg={12}>
                                    <Grid container item lg={6} xs={12}>
                                        <Grid item lg={12} style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Box style={{ display: "flex", flexWrap: width === "xs" && "wrap" }}>
                                                <SpellCasting
                                                    ability={character["stats"]["spellcastingAbility"]}
                                                    changeStats={props.changeStats}
                                                    editable={props.editable} />
                                                <SpellDC
                                                    ability={character["stats"]["spellcastingAbility"]}
                                                    proficiency={props.proficiencyBonus}
                                                    abilityScores={character["stats"]["abilityScores"]}
                                                />
                                                <SpellBonus
                                                    ability={character["stats"]["spellcastingAbility"]}
                                                    proficiency={props.proficiencyBonus}
                                                    abilityScores={character["stats"]["abilityScores"]} />
                                            </Box>
                                            <Box style={{ display: "flex", flexWrap: width === "xs" && "wrap" }}>
                                                <ClassResource
                                                    classResource={character["stats"]["classResource"]}
                                                    changeStats={props.changeStats}
                                                    editable={props.editable} />
                                                <OtherResource
                                                    extraResource={character["stats"]["extraResource"]}
                                                    changeStats={props.changeStats}
                                                    editable={props.editable} />
                                                <SpellBurnout
                                                    burnout={character["stats"]["spellBurnout"]}
                                                    changeStats={props.changeStats} />
                                            </Box>
                                            <Box style={{ height: "100%" }}>
                                                <OtherResources
                                                    otherResource={character["stats"]["otherResource"]}
                                                    changeStats={props.changeStats}
                                                    editable={props.editable} />
                                            </Box>
                                            <Box style={{ height: "100%" }}>
                                                <Attacks
                                                    attacks={character["stats"]["attacks"]}
                                                    abilityScores={character["stats"]["abilityScores"]}
                                                    proficiencyBonus={props.proficiencyBonus}
                                                    changeStats={props.changeStats}
                                                    editable={props.editable} />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container item lg={6} xs={12}>
                                        {(props.settings && props.settings.generalOptions.stress) &&
                                            <Grid item lg={12}>
                                                <Box style={{ display: "flex", height: "100%" }}>
                                                    <Stress
                                                        stress={character["stats"]["stress"]}
                                                        changeStats={props.changeStats}
                                                        editable={props.editable} />
                                                    <StressLevels />
                                                </Box>
                                            </Grid>}
                                        {(props.settings && props.settings.generalOptions.afflictions) &&
                                            <Grid item lg={12} style={{ width: width === "xs" && "100%" }}>
                                                <Afflictions
                                                    afflictions={character["stats"]["afflictions"]}
                                                    changeStats={props.changeStats}
                                                    editable={props.editable} />
                                            </Grid>}
                                        {(props.settings && props.settings.generalOptions.exhaustionTable) &&
                                            <Grid item lg={12}>
                                                <ExhaustionEffects
                                                    exhaustion={character["stats"]["exhaustion"]} />
                                            </Grid>}
                                        <Grid item lg={12} style={{ width: width === "xs" && "100%" }}>
                                            <Conditions
                                                conditions={character["stats"]["conditions"]}
                                                changeStats={props.changeStats}
                                                editable={props.editable} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            }
        </div>
    );
}