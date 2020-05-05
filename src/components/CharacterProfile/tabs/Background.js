import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        width: "100%"
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
    img: {
        width: "100%"
    },
    trait: {
        marginLeft: "1rem"
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
                <Grid item xs={12} sm={12} md={6}>
                    <Paper variant="outlined" className={classes.paper}>
                        <Typography variant="subtitle2">{'Rasgos de Personalidad.'}</Typography>
                        <Box className={classes.trait}>{
                            character["psychTraits"]["personalityTrait1"]
                            + character["psychTraits"]["personalityTrait2"]}</Box>
                        <Typography variant="subtitle2">{'Ideales.'}</Typography>
                        <Box className={classes.trait}>{character["psychTraits"]["ideals"]}</Box>
                        <Typography variant="subtitle2">{'Vínculos.'}</Typography>
                        <Box className={classes.trait}>{character["psychTraits"]["bonds"]}</Box>
                        <Typography variant="subtitle2">{'Defectos.'}</Typography>
                        <Box className={classes.trait}>{character["psychTraits"]["flaws"]}</Box>
                        <Typography variant="subtitle2">{'Historia.'}</Typography>
                        <Box className={classes.trait}>
                            <span dangerouslySetInnerHTML={{ __html: character["psychTraits"]["backstory"] }} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Paper variant="outlined" className={classes.paper}>
                        <Typography variant="subtitle2">{'Rasgos físicos.'}</Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Box className={classes.trait}>
                                    <Typography display="inline" variant="subtitle2">{'Edad. '}</Typography>
                                    <Typography display="inline" variant="subtitle4" className={classes.trait}>{character["physicalTraits"]["age"]}</Typography>
                                </Box>
                                <Box className={classes.trait}>
                                    <Typography display="inline" variant="subtitle2">{'Género. '}</Typography>
                                    <Typography display="inline" variant="subtitle4" className={classes.trait}>{character["gender"]}</Typography>
                                </Box>
                                <Box className={classes.trait}>
                                    <Typography display="inline" variant="subtitle2">{'Altura. '}</Typography>
                                    <Typography display="inline" variant="subtitle4" className={classes.trait}>{character["physicalTraits"]["height"]}</Typography>
                                </Box>
                                <Box className={classes.trait}>
                                    <Typography display="inline" variant="subtitle2">{'Peso.'}</Typography>
                                    <Typography display="inline" variant="subtitle4" className={classes.trait}>{character["physicalTraits"]["weight"]}</Typography>
                                </Box>
                                <Box className={classes.trait}>
                                    <Typography display="inline" variant="subtitle2">{'Ojos.'}</Typography>
                                    <Typography display="inline" variant="subtitle4" className={classes.trait}></Typography>{character["physicalTraits"]["eyes"]}
                                </Box>
                                <Box className={classes.trait}>
                                    <Typography display="inline" variant="subtitle2">{'Pelo.'}</Typography>
                                    <Typography display="inline" variant="subtitle4" className={classes.trait}>{character["physicalTraits"]["hair"]}</Typography>
                                </Box>
                                <Box className={classes.trait}>
                                    <Typography display="inline" variant="subtitle2">{'Piel.'}</Typography>
                                    <Typography display="inline" variant="subtitle4" className={classes.trait}>{character["physicalTraits"]["skin"]}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <img className={classes.img} src={character.imageUrl} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div >
    );
}