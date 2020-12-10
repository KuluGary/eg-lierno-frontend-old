import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import ModalImage from "react-modal-image";

const useStyles = makeStyles({
    root: {
        height: "100%",
        width: "100%",
        margin: "0 .1rem .1rem .1rem",
        display: "flex",
        flexDirection: "column",
        marginTop: 0
    },
    paper: {
        padding: ".5rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-end',
        // alignSelf: "stretch"    ,
        height: "100%",
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

export default function Portrait(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <ModalImage
                        hideDownload
                        align="left"                        
                        className={classes.image}
                        small={props.image}
                        large={props.image}
                    />
                    <TextField
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                        }}
                        fullWidth
                        value={props.image}
                        disabled={!props.editable}
                        onChange={(event) => props.changeFlavor("portrait", event.target.value)}
                        variant="outlined" />
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'Retrato'}</Typography>
                </Box>
            </Paper>
        </div>
    );
}