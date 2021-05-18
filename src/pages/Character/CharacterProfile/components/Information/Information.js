import React, { useEffect } from 'react';

import { useWidth } from 'helpers/media-query';

import {
    Stats,
    Attacks,
    SavingThrows,
    Skills,
    HitDice,
    Wounds,
    ClassResource,
    StressLevels,
    ExhaustionEffects,
    OtherResources,
    HitPoints,
    StatComponent
} from './components';
import { faShieldAlt, faShoePrints, faEye, faSkull, faMedal, faSortNumericUp, faHandSparkles } from '@fortawesome/free-solid-svg-icons';

import Grid from '@material-ui/core/Grid';

import useStyles from "./Information.styles";

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
                            <Grid item container lg={7} spacing={1}>
                                <Stats
                                    character={true}
                                    stats={character["stats"]["abilityScores"]}
                                    changeStats={props.changeStats}
                                    modifiers={character["stats"]["abilityScoreModifiers"]}
                                    editable={props.editable} />
                            </Grid>
                            <Grid item container lg={5} xs={12} spacing={1} style={{ marginRight: 0, paddingRight: 0 }}>
                                <Grid item lg={3}>
                                    <StatComponent
                                        headerText={'COMPETENCIA'}
                                        subtitle={" "}
                                        value={props.proficiencyBonus}
                                        editable={false}
                                        onChange={() => { }}
                                        icon={faHandSparkles}
                                    />
                                </Grid>
                                <Grid item lg={3}>
                                    <StatComponent
                                        headerText={'INSPIRACIÓN'}
                                        subtitle={" "}
                                        value={character["stats"]["inspiration"] || 0}
                                        editable={props.editable}
                                        onChange={(event) => props.changeStats("inspiration", parseInt(event.target.value))}
                                        icon={faMedal}
                                    />
                                </Grid>
                                <Grid item lg={3} xs={6}>
                                    <StatComponent
                                        headerText={'ARMADURA'}
                                        subtitle={'NATURAL'}
                                        value={character["stats"]["armorClass"]}
                                        onChange={(event) => props.changeStats("armorClass", parseInt(event.target.value))}
                                        editable={props.editable}
                                        icon={faShieldAlt}
                                    />
                                </Grid>
                                <Grid item lg={3} xs={6} style={{ paddingRight: 0 }}>
                                    <StatComponent
                                        headerText={'INICIATIVA'}
                                        subtitle={" "}
                                        value={character["stats"]["initiativeBonus"]}
                                        onChange={(event) => props.changeStats("initiativeBonus", parseInt(event.target.value))}
                                        editable={props.editable}
                                        icon={faSortNumericUp} />
                                </Grid>
                            </Grid>
                            <Grid item lg={4}>
                                <HitPoints
                                    hp={character["stats"]["hitPoints"]}
                                    changeStats={props.changeStats}
                                    editable={props.editable} />
                            </Grid>
                            <Grid item lg={2} xs={12}>
                                <HitDice
                                    classes={character["stats"]["classes"]}
                                    hitDice={character["stats"]["hit_dice"]}
                                    changeStats={props.changeStats}
                                    editable={props.editable} />
                            </Grid>
                            <Grid item container lg={4} xs={12} spacing={1}>
                                <Grid item lg={4} xs={6}>
                                    <StatComponent
                                        headerText={'VELOCIDAD'}
                                        subtitle={'ANDANDO'}
                                        value={character["stats"]["speed"]}
                                        onChange={(event) => props.changeStats("speed", parseInt(event.target.value))}
                                        editable={props.editable}
                                        icon={faShoePrints}
                                    />
                                </Grid>
                                <Grid item lg={4} xs={6}>
                                    <StatComponent
                                        headerText={'PERCEPCIÓN'}
                                        subtitle={'PASIVA'}
                                        value={character["stats"]["passivePerception"]}
                                        onChange={(event) => props.changeStats("passivePerception", parseInt(event.target.value))}
                                        editable={props.editable}
                                        icon={faEye}
                                    />
                                </Grid>
                                <Grid item lg={4} xs={6}>
                                    <StatComponent
                                        headerText={'FALLOS DE MUERTE'}
                                        subtitle={" "}
                                        value={character["stats"]["death_saves"] || 0}
                                        onChange={(event) => props.changeStats("death_saves", parseInt(event.target.value))}
                                        editable={props.editable}
                                        icon={faSkull} />
                                </Grid>
                            </Grid>
                            <Grid item lg={2} xs={5}>
                                <ClassResource
                                    classResource={character["stats"]["classResource"]}
                                    changeStats={props.changeStats}
                                    editable={props.editable} />
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
                            <Grid item container lg={5} xs={12} style={{ minHeight: width !== "xs" && "70%", rowGap: 8 }}>
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