import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import useStyles from './OtherResource.styles';

export function OtherResource(props) {
    const classes = useStyles();
    const resource = props.extraResource || {};

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