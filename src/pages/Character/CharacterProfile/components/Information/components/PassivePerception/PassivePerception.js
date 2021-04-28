import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import useStyles from './PassivePerception.styles';

export function PassivePerception(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <TextField
                        type="number"
                        disabled={!props.editable}
                        value={props.perception}
                        className={classes.textField}
                        onChange={(event) => props.changeStats("passivePerception", event.target.value)}
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                        }}></TextField>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }}>{'PER. PASIVA'}</Typography>
                </Box>                
            </Paper>
        </div>
    );
}