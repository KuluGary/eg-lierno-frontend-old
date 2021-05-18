import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField } from '@material-ui/core';
import useStyles from './Stats.styles';

export default function Stats(props) {
    const classes = useStyles();
    const statNames = ["FUERZA", "DESTREZA", "CONSTITUCIÓN", "INTELIGENCIA", "SABIDURÍA", "CARISMA"];

    return (
        props.stats && (
            Object.keys(props.stats).map((stat, index) => (
                <Grid item lg={props.mode === "npc" ? 2 : 1} xs={5}>
                    <Paper elevation={1} variant="outlined" className={classes.stat}>
                        <Typography variant="body2" style={{ fontSize: 10 }}>{statNames[index]}</Typography>
                        <Typography variant="h6" style={{ fontSize: 30 }}>{props.stats && (Math.floor((props.stats[stat] - 10) / 2))}</Typography>
                        <Paper elevation={2} variant="outlined" style={{ display: "inline-block", padding: "0 .5rem", maxWidth: "80%" }}>
                            <TextField
                                type="number"
                                className={classes.textField}
                                disabled={!props.editable}
                                fullWidth
                                value={props.stats[stat]}
                                InputProps={{
                                    classes: {
                                        input: classes.resize,
                                    }
                                }}
                                onChange={(event) => props.changeStats("abilityScores", { ...props.stats, [stat]: event.target.value })}
                            />
                        </Paper>
                    </Paper>
                </Grid>
            ))
        )
    );
}