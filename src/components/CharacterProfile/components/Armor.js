import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        // height: "100%"
        marginBottom: ".1rem",
        marginTop: 0,
        paddingLeft: ".1rem",
        width: "100%"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: "stretch"    ,
        height: "100%"
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
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

export default function Armor(props) {
    const classes = useStyles();

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <TextField
                        type="number"
                        value={props.ac}
                        className={classes.textField}
                        disabled={!props.editable}
                        onChange={(event) => props.changeStats("armorClass", event.target.value)}
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                        }}></TextField>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }}>{'ARMADURA'}</Typography>
                </Box>
            </Paper>
        </div>
    );
}