import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        // margin: "0 .1rem .2rem .1rem",
        margin: ".1rem",
        width: "100%"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: "stretch"    ,
        height: "100%"
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default function SpellBonus(props) {
    const classes = useStyles();
    const lookupTable = {
        "FUE": "strength",
        "DES": "dexterity",
        "CONST": "constitution",
        "INT": "intelligence",
        "SAB": "wisdom",
        "CAR": "charisma"
    }

    let spellBonus = "N/A";

    if (props.ability && props.ability !== "N/A") {
        const abilityScoreModifier = Math.floor((props.abilityScores[lookupTable[props.ability]] - 10) / 2)
        
        spellBonus = (props.ability && props.ability) !== "N/A" ? props.proficiency + abilityScoreModifier : "N/A"
    }

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="h6">{spellBonus}</Typography>
                    <Typography variant="subtitle2" style={{ fontSize: "8px" }} >{'BONO DE HECHIZOS'}</Typography>
                </Box>
            </Paper>
        </div>
    );
}