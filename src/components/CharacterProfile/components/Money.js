import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        // height: "100%"
        margin: "0 .1rem .2rem .1rem",
        display: "flex",
        flexWrap: "wrap"
    },
    paper: {
        padding: ".5rem",
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        // alignSelf: "stretch"  
        width: "32%",
        margin: ".1rem"
    },
    stat: {
        // margin: "0 1.5rem",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        // justifyContent: 'space-around',
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 8,
        textAlign: 'center'
    },
    textField: {
        textAlign: 'center',
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

export default function Money(props) {
    const classes = useStyles();

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        label="Cobre"
                        value={props.money && props.money.copper}
                        defaultValue={0}
                        onChange={(e) => props.changeStats("money", { ...props.money, copper: e.target.value })}
                        disabled={!props.editable}
                        className={classes.textField}
                        InputProps={{
                            classes: {
                                input: classes.textField,
                            },
                            inputProps: { min: 0 }
                        }} />
                </Box>
            </Paper>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    {/* <TextField variant="outlined" size="small" label="Plata" /> */}
                    <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        label="Plata"
                        value={props.money && props.money.silver}
                        defaultValue={0}
                        onChange={(e) => props.changeStats("money", { ...props.money, silver: e.target.value })}
                        disabled={!props.editable}
                        className={classes.textField}
                        InputProps={{
                            classes: {
                                input: classes.textField,
                            },
                            inputProps: { min: 0 }
                        }} />
                </Box>
            </Paper>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    {/* <TextField variant="outlined" size="small" label="Oro" /> */}
                    <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        label="Oro"
                        value={props.money && props.money.gold}
                        defaultValue={0}
                        onChange={(e) => props.changeStats("money", { ...props.money, gold: e.target.value })}
                        disabled={!props.editable}
                        className={classes.textField}
                        InputProps={{
                            classes: {
                                input: classes.textField,
                            },
                            inputProps: { min: 0 }
                        }} />
                </Box>
            </Paper>
        </div>
    );
}