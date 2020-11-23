import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        height: "99%",
        width: "100%",
        // display: "flex",
        flexDirection: "column",
        margin: ".2rem .1rem .1rem 0",
    },
    paper: {
        margin: ".1rem",
        padding: ".5rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        height: "100%",
        // margin: ".1rem 0",
    },
    stat: {
        // margin: "0 1.5rem",
        textAlign: "center",
        width: "100%",
        // height: "100%"
        padding: "0 0 1rem 0"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 11
    }
});

export default function PsychDescription(props) {
    const classes = useStyles();

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'Descripción psicológica'}</Typography>
                    <TextField
                        style={{ height: "100%" }}
                        fullWidth
                        multiline
                        inputProps={{
                            style: { minHeight: "60%" }
                        }}
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                            style: { minHeight: "100%", alignItems: "baseline" }
                        }}
                        value={props.description}
                        variant="outlined"
                        onChange={(event) => props.changeFlavor("psychologicalDescription", event.target.value)}
                        disabled={!props.editable} />
                </Box>
            </Paper>
        </div>
    );
}