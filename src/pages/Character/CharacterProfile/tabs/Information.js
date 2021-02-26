import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Stats from "../components/Stats";
import Proficiency from "../components/Proficiency";
import Speed from "../components/Speed";
import Armor from "../components/Armor";
import Attacks from "../components/Attacks";
import SavingThrows from '../components/SavingThrows';
import Skills from '../components/Skills';
import Initiative from '../components/Initiative';
import Inspiration from '../components/Inspiration';
import HitDice from '../components/HitDice';
import DeathSaves from '../components/DeathSaves';
import Wounds from '../components/Wounds';
import SpellCasting from '../components/SpellCasting';
import SpellDC from '../components/SpellDC';
import SpellBonus from '../components/SpellBonus';
import ClassResource from '../components/ClassResource';
import SpellBurnout from '../components/SpellBurnout';
import StressLevels from '../components/StressLevels';
import ExhaustionEffects from '../components/ExhaustionEffects';
import OtherResources from '../components/OtherResources';
import { useWidth } from 'helpers/media-query';
import CurrentHitPoints from '../components/HitPoints/CurrentHitPoints'
import MaxHitPoints from '../components/HitPoints/MaxHitPoints'

import Grid from '@material-ui/core/Grid';
import PassivePerception from '../components/PassivePerception';
import TempHitPoints from '../components/HitPoints/TempHitPoints';

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
                    <Grid container>
                        <Grid container item lg={9} xs={12} spacing={1}>
                            <Stats
                                // mode="npc"
                                character={true}
                                stats={character["stats"]["abilityScores"]}
                                changeStats={props.changeStats}
                                modifiers={character["stats"]["abilityScoreModifiers"]}
                                editable={props.editable} />
                            <Grid container item lg={3} xs={12} style={{ rowGap: 8 }}>
                                <Grid item lg={12} xs={12}>
                                    <Proficiency
                                        proficiency={props.proficiencyBonus}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <Inspiration
                                        inspiration={character["stats"]["inspiration"]}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                </Grid>
                            </Grid>
                            <Grid item container lg={3} xs={12} spacing={1}>
                                <Grid item lg={6} xs={6}>
                                    <Armor
                                        ac={character["stats"]["armorClass"]}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                </Grid>
                                <Grid item lg={6} xs={6}>
                                    <Initiative
                                        initiative={character["stats"]["initiativeBonus"]}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                </Grid>
                            </Grid>
                            <Grid item lg={2} xs={4}>
                                <MaxHitPoints
                                    changeStats={props.changeStats}
                                    hp={character["stats"]["hitPoints"]}
                                    editable={props.editable} />
                            </Grid>
                            <Grid item lg={2} xs={4}>
                                <CurrentHitPoints
                                    changeStats={props.changeStats}
                                    hp={character["stats"]["hitPoints"]}
                                    editable={props.editable} />
                            </Grid>
                            <Grid item lg={2} xs={4}>
                                <TempHitPoints
                                    changeStats={props.changeStats}
                                    hp={character["stats"]["hitPoints"]}
                                    editable={props.editable} />
                            </Grid>
                            <Grid item lg={3} xs={12}>
                                <HitDice
                                    classes={character["stats"]["classes"]}
                                    hitDice={character["stats"]["hit_dice"]}
                                    changeStats={props.changeStats}
                                    editable={props.editable} />
                            </Grid>
                            <Grid item container lg={3} xs={12} spacing={1}>
                                <Grid item lg={6} xs={6}>
                                    <Speed
                                        speed={character["stats"]['speed']}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                </Grid>
                                <Grid item lg={6} xs={6}>
                                    <PassivePerception
                                        perception={character["stats"]["passivePerception"]}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                </Grid>
                            </Grid>
                            <Grid item lg={2} xs={4}>
                                <SpellCasting
                                    ability={character["stats"]["spellcastingAbility"]}
                                    changeStats={props.changeStats}
                                    editable={props.editable} />
                            </Grid>
                            <Grid item lg={2} xs={4}>
                                <SpellDC
                                    ability={character["stats"]["spellcastingAbility"]}
                                    proficiency={props.proficiencyBonus}
                                    abilityScores={character["stats"]["abilityScores"]}
                                />
                            </Grid>
                            <Grid item lg={2} xs={4}>
                                <SpellBonus
                                    ability={character["stats"]["spellcastingAbility"]}
                                    proficiency={props.proficiencyBonus}
                                    abilityScores={character["stats"]["abilityScores"]} />
                            </Grid>
                            <Grid item lg={2} xs={4}>
                                <SpellBurnout
                                    burnout={character["stats"]["spellBurnout"]}
                                    changeStats={props.changeStats} />
                            </Grid>
                            <Grid item container lg={4} xs={8} spacing={1}>
                                <Grid item lg={7} xs={7}>
                                    <DeathSaves
                                        deathSaves={character["stats"]["death_saves"]}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                </Grid>
                                <Grid item lg={5} xs={5}>
                                    <ClassResource
                                        classResource={character["stats"]["classResource"]}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                </Grid>
                            </Grid>
                            <Grid item container spacing={1} lg={7} xs={12} style={{ minHeight: width !== "xs" && "60%" }}>
                                {(props.settings && props.settings.generalOptions.exhaustionTable) &&
                                <Grid item lg={12} xs={12}>
                                    <ExhaustionEffects
                                        exhaustion={character["stats"]["exhaustion"]}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                        </Grid>
                                }
                                <Grid item lg={12} xs={12}>
                                    <Attacks
                                        attacks={character["stats"]["attacks"]}
                                        abilityScores={character["stats"]["abilityScores"]}
                                        proficiencyBonus={props.proficiencyBonus}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                </Grid>
                            </Grid>
                            <Grid item container lg={5} xs={12} style={{ minHeight: width !== "xs" && "60%", rowGap: 8 }}>
                                {(props.settings && props.settings.generalOptions.stress) &&
                                    <Grid item lg={12} xs={12}>
                                        <StressLevels
                                            stress={character["stats"]["stress"]}
                                            afflictions={character["stats"]["afflictions"]}
                                            changeStats={props.changeStats}
                                            editable={props.editable} />
                                    </Grid>
                                }
                                <Grid item lg={12} xs={12}>
                                    <Wounds
                                        wounds={character["stats"]["wounds"]}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <OtherResources
                                        otherResource={character["stats"]["otherResource"]}
                                        changeStats={props.changeStats}
                                        editable={props.editable} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} item lg={3} xs={12} style={{ marginRight: 0 }}>
                            <Grid item xs={12}>
                                <SavingThrows
                                    proficiency={props.proficiencyBonus}
                                    stats={character["stats"]["abilityScores"]}
                                    saving={character["stats"]["savingThrows"]}
                                    changeStats={props.changeStats}
                                    editable={props.editable} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skills
                                    skills={character["stats"]["skills"]}
                                    stats={character["stats"]["abilityScores"]}
                                    proficiency={props.proficiencyBonus}
                                    changeStats={props.changeStats}
                                    editable={props.editable}
                                    settings={props.settings} />
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            }
        </div>
    );
}