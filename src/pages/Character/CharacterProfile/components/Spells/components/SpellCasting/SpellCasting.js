import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useStyles from './SpellCasting.styles';

export function SpellCasting(props) {
    const classes = useStyles();
    const options = [
        "N/A",
        "FUE",
        "DES",
        "CONST",
        "INT",
        "SAB",
        "CAR"
    ];

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Select
                        fullWidth
                        disabled={!props.editable}                        
                        value={props.ability}
                        defaultValue={options[0]}
                        onChange={(event) => props.changeStats("spellcastingAbility", event.target.value)}
                    >
                        {options.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                    </Select>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'HAB. DE HECHIZOS'}</Typography>
                </Box>
            </Paper>
        </div>
    );
}