import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import useStyles from "./Experience.styles";

export default function Experience(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2" style={{ fontSize: "11px", marginRight: ".5rem" }} >{'EXPERIENCIA'}</Typography>
                    <Box>
                        <TextField
                            disabled={!props.editable} />
                    </Box>
                </Box>                
            </Paper>
        </div>
    );
}