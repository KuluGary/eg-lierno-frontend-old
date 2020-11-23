import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        height: "100%",
        width: "100%",
        margin: "0 .1rem .1rem .1rem",
        display: "flex",
        flexDirection: "column",
    },
    paper: {
        padding: ".5rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: "stretch"    ,
        height: "100%",
        // margin: ".1rem 0"
        marginBottom: ".1rem",
        marginRight: ".2rem"
    },
    stat: {
        // margin: "0 1.5rem",
        textAlign: "center",
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 11
    }
});

export default function Personality(props) {
    const classes = useStyles();

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <TextField
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                        }}
                        disabled={!props.editable}
                        value={props.traits.personalityTraits}
                        onChange={(event) => props.changeFlavor("personality", { ...props.traits, personalityTraits: event.target.value })}
                        fullWidth
                        multiline
                        variant="outlined" />
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'Rasgos de personalidad'}</Typography>
                </Box>
            </Paper>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <TextField
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                        }}
                        disabled={!props.editable}
                        value={props.traits.ideals}
                        onChange={(event) => props.changeFlavor("personality", { ...props.traits, ideals: event.target.value })}
                        fullWidth
                        multiline
                        variant="outlined" />
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'Ideales'}</Typography>
                </Box>
            </Paper>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <TextField
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                        }}
                        disabled={!props.editable}
                        value={props.traits.bonds}
                        onChange={(event) => props.changeFlavor("personality", { ...props.traits, bonds: event.target.value })}
                        fullWidth
                        multiline
                        variant="outlined" />
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'Vínculos'}</Typography>
                </Box>
            </Paper>
            <Paper variant="outlined" className={classes.paper} style={{ marginBottom: 0 }}>
                <Box component="span" className={classes.stat}>
                    <TextField
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                        }}
                        disabled={!props.editable}
                        value={props.traits.flaws}
                        onChange={(event) => props.changeFlavor("personality", { ...props.traits, flaws: event.target.value })}
                        fullWidth
                        multiline
                        variant="outlined" />
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'Defectos'}</Typography>
                </Box>
            </Paper>
        </div>
    );
}