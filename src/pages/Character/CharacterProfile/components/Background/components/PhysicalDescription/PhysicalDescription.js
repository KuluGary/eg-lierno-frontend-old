import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import useStyles from "./PhysicalDescription.styles";

export default function PsychDescription(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    {/* <Typography variant="subtitle2" className={classes.subtitle} >{'DESCRIPCIÓN FÍSICA'}</Typography> */}
                    <TextField
                        style={{ height: "100%" }}
                        label={'Descripción física'}
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