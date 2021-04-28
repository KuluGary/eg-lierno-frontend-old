import React from 'react';
import Grid from '@material-ui/core/Grid';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import Personality from './components/Personality/Personality';
import PsychDescription from './components/PsychDescription/PsychDescription';
import PhysicalDescription from './components/PhysicalDescription/PhysicalDescription';
import Experience from './components/Experience/Experience';
import Training from './components/Training/Training';
import Backstory from './components/Backstory/Backstory';
import Portrait from './components/Portrait/Portrait';
import useStyles from './Background.styles';

export default function Armor(props) {
    const classes = useStyles();
    const { character } = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item container spacing={1} lg={8} xs={12}>
                    <Grid item lg={4} xs={12}>
                        <CharacterDetails
                            traits={character["traits"]}
                            features={props.features}
                            changeFlavor={props.changeFlavor}
                            changeStats={props.changeStats}
                            editable={props.editable}
                            pronoun={props.pronoun} />
                    </Grid>
                    <Grid item container lg={4} xs={12} style={{ gap: 8 }}>
                        <Personality
                            traits={character["personality"]}
                            changeFlavor={props.changeFlavor}
                            editable={props.editable} />
                    </Grid>
                    <Grid item lg={4}>
                        <Portrait
                            image={character.portrait}
                            changeFlavor={props.changeFlavor}
                            editable={props.editable} />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <PsychDescription
                            description={character.psychologicalDescription}
                            changeFlavor={props.changeFlavor}
                            editable={props.editable} />
                    </Grid>
                    <Grid container item lg={6} xs={12} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {(props.settings && props.settings.generalOptions.experience) &&
                            <Grid item lg={12}>
                                <Experience
                                    editable={props.editable} />
                            </Grid>
                        }
                        {(props.settings && props.settings.generalOptions.training) &&
                            <Grid item lg={12}>
                                <Training
                                    editable={props.editable} />
                            </Grid>
                        }
                        <Grid item lg={12}>
                            <PhysicalDescription
                                description={character.physicalDescription}
                                changeFlavor={props.changeFlavor}
                                editable={props.editable} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={4} xs={12} container spacing={1}>
                    <Grid item lg={12} xs={12}>
                        <Backstory
                            story={character["backstory"]}
                            changeFlavor={props.changeFlavor}
                            editable={props.editable} />
                    </Grid>
                </Grid>
            </Grid>
        </div >
    );
}