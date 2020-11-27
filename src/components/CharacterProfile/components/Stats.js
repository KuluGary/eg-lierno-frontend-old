import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { TextField } from '@material-ui/core';
import { useWidth } from '../../../helpers/media-query';

const useStyles = makeStyles({
    root: {
        height: "100%",
        margin: "0 .1rem"
    },
    paper: {
        margin: 0,
        padding: "1rem 0",
        display: "flex",
        // flexDirection: "column",
        // justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: "wrap",
        height: "100%"
    },
    stat: {
        // margin: "0 1rem",
        padding: ".5rem 0",
        textAlign: "center",
        // width: 85
        width: "5.2rem"
    },
    statBox: {
        display: "flex",
        margin: ".2rem 0"
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
        }
    }
});

export default function Stats(props) {
    const classes = useStyles();
    const statNames = ["FUERZA", "DESTREZA", "CONSTITUCIÓN", "INTELIGENCIA", "SABIDURÍA", "CARISMA"];
    const width = useWidth();

    return (
        <div className={classes.root}>
            {console.log(props.style)}
            <Paper 
                variant={props.character && 'outlined'} 
                className={classes.paper} 
                // style={{ padding: width === "xs" ? "1rem" : "1rem 0" }}
                elevation={0}
                style={((props.style === "npc" || width === 'xs')) ? { flexDirection: "row", justifyContent: "space-between", padding: width === "xs" ? "1rem" : "1rem 0" } : { flexDirection: "column" }}>
                {props.stats ? (
                    Object.keys(props.stats).map((stat, index) => (
                        <span className={classes.statBox} key={index} >
                            <Paper elevation={1} variant="outlined" className={classes.stat}>
                                <Typography variant="body2" style={{ fontSize: 10 }}>{statNames[index]}</Typography>
                                <Typography variant="h6" style={{ fontSize: 30 }}>{props.stats && (Math.floor((props.stats[stat] - 10) / 2))}</Typography>
                                <Paper elevation={2} variant="outlined" style={{ display: "inline-block", padding: "0 .5rem", maxWidth: "40%" }}>
                                    <TextField
                                        type="number"
                                        className={classes.textField}
                                        disabled={!props.editable}
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
                        </span>
                    ))
                ) : (
                        Object.keys(props.stats).map((stat, index) => (
                            <span className={classes.statBox} key={index} style={{ margin: ".2rem" }} >
                                <Box component="span" className={classes.stat}>
                                    <Typography variant="subtitle2">{statNames[index].toUpperCase()}</Typography>
                                    <Typography variant="h6">{props.stats && props.stats[stat]}</Typography>
                                    {/* <Typography variant="subtitle1">{props.stats.abilityScoreModifiers && props.stats.abilityScoreModifiers[stat]}</Typography> */}
                                </Box>
                                {index + 1 !== Object.keys(props.stats).length && <Divider orientation="vertical" flexItem />}
                            </span>
                        ))
                    )}
            </Paper>
        </div>
    );
}