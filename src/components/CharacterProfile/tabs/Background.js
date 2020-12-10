import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CharacterDetails from '../components/CharacterDetails';
import Personality from '../components/Personality';
import PsychDescription from '../components/PsychDescription';
import PhysicalDescription from '../components/PhysicalDescription';
import Experience from '../components/Experience';
import Training from '../components/Training';
import Backstory from '../components/Backstory';
import Portrait from '../components/Portrait';

const useStyles = makeStyles({
    root: {
        width: "100%",
        paddingLeft: "4px",
    },
    paper: {
        margin: 0,
        padding: "1rem",
        height: "100%"
    },
    stat: {
        margin: "0 1.5rem",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    image: {
        height: "35vh",
        float: "left",
        display: "block",
        margin: "0 auto",
        padding: "0 1rem .5rem 0"
    },
    trait: {
        margin: "0 1rem"
    },
    psychTrait: {
        margin: ".5rem 1rem"
    },
    physicalTraits: {
        marginBottom: "1rem"
    },
    profileBox: {
        padding: "1rem",
        minHeight: "60vh",
        height: "100%"
    },
    traitBox: {
        minHeight: "100%"
    }
});

export default function Armor(props) {
    const classes = useStyles();
    const { character } = props;

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Grid container spacing={1} >
                <Grid item container lg={8} xs={12}>
                    <Grid item lg={4} xs={12}>
                        <CharacterDetails
                            traits={character["traits"]}
                            changeFlavor={props.changeFlavor}
                            editable={props.editable} />
                    </Grid>
                    <Grid item container lg={8} xs={12}>
                        <Grid item lg={7} xs={12}>
                            <Personality
                                traits={character["personality"]}
                                changeFlavor={props.changeFlavor}
                                editable={props.editable} />
                        </Grid>
                        <Grid item lg={5} xs={12}>
                            <Portrait
                                image={character.portrait}
                                changeFlavor={props.changeFlavor}
                                editable={props.editable} />
                        </Grid>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <PsychDescription
                            description={character.psychologicalDescription}
                            changeFlavor={props.changeFlavor}
                            editable={props.editable} />
                    </Grid>
                    <Grid item lg={6} xs={12} style={{ display: "flex", flexDirection: "column" }}>
                        {(props.settings && props.settings.generalOptions.experience) &&
                            <Experience
                                editable={props.editable} />
                        }
                        {(props.settings && props.settings.generalOptions.training) &&
                            <Training
                                editable={props.editable} />
                        }
                        <PhysicalDescription
                            description={character.physicalDescription}
                            changeFlavor={props.changeFlavor}
                            editable={props.editable} />
                    </Grid>
                </Grid>
                <Grid item lg={4} xs={12}>
                    <Backstory
                        story={character["backstory"]}
                        editable={props.editable} />
                </Grid>
                {/* <Grid item lg={12} sm={12} md={6} className={classes.traitBox}>
                    <Paper variant="outlined" className={classes.paper}>
                        <Typography variant="subtitle2">{'Rasgos físicos.'}</Typography>
                        <Box component="div" className={classes.physicalTraits}>
                            <Box component="div" className={classes.trait}>
                                <Typography variant="subtitle2" display="inline">{'Edad. '}</Typography>
                                <Typography display="inline" variant="subtitle4">{character["physicalTraits"]["age"]}</Typography>
                            </Box>
                            <Box component="div" className={classes.trait}>
                                <Typography variant="subtitle2" display="inline">{'Género. '}</Typography>
                                <Typography display="inline" variant="subtitle4">{character["gender"]}</Typography>
                            </Box>
                            <Box component="div" className={classes.trait}>
                                <Typography variant="subtitle2" display="inline">{'Altura. '}</Typography>
                                <Typography display="inline" variant="subtitle4">{character["physicalTraits"]["height"]}</Typography>
                            </Box>
                            <Box component="div" className={classes.trait}>
                                <Typography variant="subtitle2" display="inline">{'Peso. '}</Typography>
                                <Typography display="inline" variant="subtitle4">{character["physicalTraits"]["weight"]}</Typography>
                            </Box>
                            <Box component="div" className={classes.trait}>
                                <Typography variant="subtitle2" display="inline">{'Ojos. '}</Typography>
                                <Typography display="inline" variant="subtitle4"></Typography>{character["physicalTraits"]["eyes"]}
                            </Box>
                            <Box component="div" className={classes.trait}>
                                <Typography variant="subtitle2" display="inline">{'Pelo. '}</Typography>
                                <Typography display="inline" variant="subtitle4">{character["physicalTraits"]["hair"]}</Typography>
                            </Box>
                            <Box component="div" className={classes.trait}>
                                <Typography variant="subtitle2" display="inline">{'Piel. '}</Typography>
                                <Typography display="inline" variant="subtitle4">{character["physicalTraits"]["skin"]}</Typography>
                            </Box>
                        </Box>
                        <Typography variant="subtitle2">{'Rasgos de Personalidad.'}</Typography>
                        <Box component="div">
                            <Box className={classes.psychTrait}>
                                <Typography variant="subtitle2" display="inline">{'Personalidad. '}</Typography>
                                <Typography display="inline" variant="subtitle4">{character["psychTraits"]["personalityTrait1"]
                                    + " " + character["psychTraits"]["personalityTrait2"]}</Typography>
                            </Box>
                            <Box className={classes.psychTrait}>
                                <Typography variant="subtitle2" display="inline">{'Ideales. '}</Typography>
                                <Typography display="inline" variant="subtitle4">{character["psychTraits"]["ideals"]}</Typography>
                            </Box>
                            <Box className={classes.trait}>
                                <Typography variant="subtitle2" display="inline">{'Vínculos. '}</Typography>
                                <Typography display="inline" variant="subtitle4">{character["psychTraits"]["bonds"]}</Typography>
                            </Box>
                            <Box className={classes.psychTrait}>
                                <Typography variant="subtitle2" display="inline">{'Defectos. '}</Typography>
                                <Typography display="inline" variant="subtitle4">{character["psychTraits"]["flaws"]}</Typography>
                            </Box>
                        </Box>

                    </Paper>
                </Grid>
                <Grid item lg={12} sm={12} md={6} className={classes.traitBox}>
                    <Paper variant="outlined" className={classes.profileBox}>
                        <ModalImage
                            hideDownload
                            align="left"
                            style={{
                                float: "left",
                                margin: "0 20px 20px 0",
                                padding: "0 1em 0 0"
                            }}
                            className={classes.image}
                            small={character.imageUrl}
                            large={character.imageUrl}
                        />
                        <Typography variant="subtitle2" display="inline">{'Historia. '}</Typography>
                        <span dangerouslySetInnerHTML={{ __html: character["psychTraits"]["backstory"] }} />
                    </Paper>
                </Grid> */}
            </Grid>
        </div >
    );
}