import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        height: "100%",
        width: "100%"
    },
    paper: {
        // margin: "0 .2rem .2rem .2rem",
        height: "100%",
        // margin: ".1rem",
        marginTop: 0,
        padding: ".2rem",
        display: "flex",
        flexDirection: "row",
        // justifyContent: 'center',
        alignItems: 'center',
    },
    stat: {
        display: "flex",
        alignItems: "center",
        width: "100%"
        // justifyContent: "space-between"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 14,
        textAlign: 'center'
    },
    textField: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },
        width: "25%",

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

export default function Inspiration(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <TextField
                        type="number"
                        className={classes.textField}
                        disabled={!props.editable}
                        value={props.inspiration ?? 0}
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                            inputProps: { min: 0, max: 20 }
                        }}
                        onChange={(event) => props.changeStats("inspiration", parseInt(event.target.value))}
                    />
                    <Typography style={{ marginLeft: "1rem", fontSize: "11px" }}>{'INSPIRACIÓN'}</Typography>
                </Box>
            </Paper>
        </div>
    );
}