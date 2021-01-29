import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        height: "100%"
    },
    paper: {
        padding: "1rem 0",
        display: "flex",
        alignItems: 'center',
        height: "100%"
    },
    stat: {
        padding: ".5rem 0",
        height: "100%",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 11,
        textAlign: 'center'
    },
    textField: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        },
    }
});

export default function Stats(props) {
    const classes = useStyles();
    const statNames = ["FUERZA", "DESTREZA", "CONSTITUCIÓN", "INTELIGENCIA", "SABIDURÍA", "CARISMA"];

    return (
            // <Grid container spacing={1} style={{ height: "100%", marginBottom: 0 }}>
                props.stats && (
                    Object.keys(props.stats).map((stat, index) => (
                        <Grid item lg={props.mode === "npc" ? 2 : 1} xs={4}>
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
            // </Grid>
    );
}