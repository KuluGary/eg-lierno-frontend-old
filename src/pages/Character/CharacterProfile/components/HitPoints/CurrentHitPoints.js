import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        height: "100%",
        // margin: "0 .1rem .2rem .1rem",
        display: "flex",
        // margin: ".1rem"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        width: "100%",
        // marginBottom: ".1rem"
    },
    stat: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        // maxWidth: "30%",
        alignItems: "center",
        // margin: "0 .5rem"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    buttonFont: {
        fontSize: ".7rem"
    },
    button: {
        padding: ".3rem"
    },
    input: {
        padding: "0px 14px",
        width: "100%",
        margin: ".5rem",
    },
    resize: {
        fontSize: 21,
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

export default function CurrentHitPoints(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <TextField
                        type="number"
                        value={props.hp.hp_current ? props.hp.hp_current : props.hp.hp_max}
                        className={classes.textField}
                        disabled={!props.editable}
                        onChange={(event) => props.changeStats("hitPoints", { ...props.hp, hp_temp: event.target.value })}
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                        }}></TextField>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }}>{'VIDA ACTUAL'}</Typography>
                </Box>
            </Paper>
        </div>
    );
}
