import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        // margin: "0 .1rem .2rem .1rem"
        // margin: ".1rem"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%"
    },
    stat: {
        margin: "0 1.2rem",
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

export default function ClassResource(props) {
    const classes = useStyles();
    const resource = props.classResource || {};

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
                            onChange={(event) => props.changeStats("classResource", { ...props.classResource, current: event.target.value })} />
                        <Typography variant="h6" style={{ margin: "0 .5rem", opacity: .5 }}>{'/'}</Typography>
                        <TextField
                            type="number"
                            disabled={!props.editable}
                            value={resource.max}
                            className={classes.textField}
                            InputProps={{
                                classes: {
                                    input: classes.textField,
                                },
                                inputProps: { min: 0 }
                            }}
                            onChange={(event) => props.changeStats("classResource", { ...props.classResource, max: event.target.value })} />
                    </Box>
                    <TextField
                        defaultValue="RECURSO DE CLASE"
                        disabled={!props.editable}
                        value={resource.label}
                        fullWidth
                        onChange={(event) => props.changeStats("classResource", { ...props.classResource, label: event.target.value })}
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