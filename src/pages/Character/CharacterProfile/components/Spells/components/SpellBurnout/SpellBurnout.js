import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useStyles from './SpellBurnout.styles';

export function SpellBurnout(props) {
    const classes = useStyles();
    const options = [
        "N/A",
        "d12",
        "d10",
        "d8",
        "d6",
        "d4"
    ];

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Select
                        fullWidth
                        disabled={!props.editable}
                        defaultValue={options[0]}
                        value={props.burnout}
                        onChange={(event) => props.changeStats("spellBurnout", event.target.value)}>
                        {options.map(option => <MenuItem value={option}>{option}</MenuItem>)}
                    </Select>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'AGOTAMIENTO DE HECHIZOS'}</Typography>
                </Box>
            </Paper>
        </div>
    );
}