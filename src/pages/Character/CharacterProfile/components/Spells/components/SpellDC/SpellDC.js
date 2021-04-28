import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyles from "./SpellDC.styles";

export function SpellDC(props) {
    const classes = useStyles();
    const lookupTable = {
        "FUE": "strength",
        "DES": "dexterity",
        "CONST": "constitution",
        "INT": "intelligence",
        "SAB": "wisdom",
        "CAR": "charisma"
    }

    let spellDC = "N/A";

    if (props.ability && props.ability !== "N/A") {
        const abilityScoreModifier = Math.floor((props.abilityScores[lookupTable[props.ability]] - 10) / 2)
        
        spellDC = (props.ability && props.ability) !== "N/A" ? 8 + props.proficiency + abilityScoreModifier : "N/A"
    }

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="h6">{spellDC}</Typography>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'CD DE HECHIZOS'}</Typography>
                </Box>
            </Paper>
        </div>
    );
}