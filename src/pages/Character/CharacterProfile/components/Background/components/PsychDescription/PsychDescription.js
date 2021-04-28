import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import useStyles from './PsychDescription.styles';

export default function PsychDescription(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
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
                        label="Descripción psicológica"
                        value={props.description}
                        variant="outlined"
                        onChange={(event) => props.changeFlavor("psychologicalDescription", event.target.value)}
                        disabled={!props.editable} />
                </Box>
            </Paper>
        </div>
    );
}