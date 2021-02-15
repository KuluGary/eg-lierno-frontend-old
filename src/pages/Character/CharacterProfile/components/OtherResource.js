import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        // margin: "0 .1rem .2rem .1rem",
        // margin: ".1rem",
        height: "100%",
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
        fontSize: 11,
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

export default function OtherResource(props) {
    const classes = useStyles();
    const resource = props.extraResource || {};

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Box style={{ display: 'flex' }}>
                        <TextField
                            type="number"
                            disabled={!props.editable}
                            value={resource.current}
                            className={classes.textField}
                            InputProps={{
                                classes: {
                                    input: classes.textField,
                                },
                                inputProps: { min: 0 }
                            }}
                            onChange={(event) => props.changeStats("extraResource", { ...props.extraResource, current: event.target.value })} />
                        <Typography variant="h6" style={{ margin: "0 .5rem", opacity: .5 }}>{'/'}</Typography>
                        <TextField
                            type="number"
                            value={resource.max}
                            disabled={!props.editable}
                            className={classes.textField}
                            InputProps={{
                                classes: {
                                    input: classes.textField,
                                },
                                inputProps: { min: 0 }
                            }}
                            onChange={(event) => props.changeStats("extraResource", { ...props.extraResource, max: event.target.value })} />
                    </Box>
                    <TextField
                        defaultValue="OTROS RECURSOS"
                        disabled={!props.editable}
                        value={resource.label}
                        fullWidth
                        onChange={(event) => props.changeStats("extraResource", { ...props.extraResource, label: event.target.value })}
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            }
                        }} />
                </Box>
            </Paper>
        </div>
    );
}