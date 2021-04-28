import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import useStyles from "./Inspiration.styles";

export function Inspiration(props) {
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