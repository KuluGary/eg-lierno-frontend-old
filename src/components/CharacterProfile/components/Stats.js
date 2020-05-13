import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    root: {
        height: "100%"
    },
    paper: {
        margin: 0,
        padding: "1rem 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: "wrap",
        height: "100%"
    },
    stat: {
        margin: "0 2rem",
        textAlign: "center"
    },
    statBox: {
        display: "flex"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default function Stats(props) {
    const classes = useStyles();
    const statNames = ["FUE", "DES", "CONST", "INT", "SAB", "CAR"]

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper elevation={props.character ? 1 : 0} variant={props.character && 'outlined'} className={classes.paper}>
                {props.stats ? (
                    Object.keys(props.stats).map((stat, index) => (
                        <span className={classes.statBox} key={index} >
                            <Box component="span" className={classes.stat}>
                                <Typography variant="subtitle2">{statNames[index]}</Typography>
                                <Typography variant="h6">{props.stats && props.stats[stat]}</Typography>
                                <Typography variant="subtitle1">{props.stats.bonuses && props.stats.bonuses[stat]}</Typography>
                            </Box>
                            {index + 1 !== Object.keys(props.stats).length && <Divider orientation="vertical" flexItem />}
                        </span>
                    ))
                ) : (
                        Object.keys(props.stats).map((stat, index) => (
                            <span className={classes.statBox} key={index} >
                                <Box component="span" className={classes.stat}>
                                    <Typography variant="subtitle2">{statNames[index].toUpperCase()}</Typography>
                                    <Typography variant="h6">{props.stats && props.stats[stat]}</Typography>
                                    <Typography variant="subtitle1">{props.stats.abilityScoreModifiers && props.stats.abilityScoreModifiers[stat]}</Typography>
                                </Box>
                                {index + 1 !== Object.keys(props.stats).length && <Divider orientation="vertical" flexItem />}
                            </span>
                        ))
                    )}
            </Paper>
        </div>
    );
}