import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import useStyles from './Money.styles';

export function Money(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
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
            <Paper elevation={0} className={classes.paper}>
                <Box component="span" className={classes.stat}>
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
            <Paper elevation={0} className={classes.paper}>
                <Box component="span" className={classes.stat}>
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