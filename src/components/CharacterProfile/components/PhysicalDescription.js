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
        // display: "flex",
        flexDirection: "column",
        // margin: ".1rem 0 .1rem 0",
    },
    paper: {
        // margin: ".1rem",
        // marginBottom: 0,
        // marginRight: 0,
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
        padding: "0 0 1rem 0"
        // height: "100%"
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
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'DESCRIPCIÓN FÍSICA'}</Typography>
                    <TextField
                        style={{ height: "100%" }}
                        fullWidth
                        multiline
                        disabled={!props.editable}
                        value={props.description}
                        onChange={(event) => props.changeFlavor("physicalDescription", event.target.value)}
                        inputProps={{
                            style: { minHeight: "60%" }
                        }}
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                            style: { minHeight: "100%", alignItems: "baseline" }
                        }}
                        variant="outlined" />
                </Box>
            </Paper>
        </div>
    );
}