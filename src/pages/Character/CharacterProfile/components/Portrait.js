import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Image from 'components/Image/Image';

const useStyles = makeStyles({
    root: {
        height: "100%",
        width: "100%",
        // margin: "0 .1rem .1rem .1rem",
        display: "flex",
        flexDirection: "column",
        // marginTop: 0
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
        width: "100%",
        height: "100%"
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
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Image
                        usage="avatar"
                        errorStyle={{ width: "100%", height: "75%", margin: "1rem 0" }}
                        style={{ width: "100%", borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}
                        mode="modal"
                        src={props.image} />
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