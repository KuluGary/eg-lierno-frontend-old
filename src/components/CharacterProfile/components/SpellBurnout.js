import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
    root: {
        // margin: "0 .1rem .2rem .1rem",
        margin: ".1rem",
        width: "100%"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: "stretch"    ,
        height: "100%"
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default function SpellBurnout(props) {
    const classes = useStyles();
    const options = [
        "N/A",
        "d12",
        "d10",
        "d8",
        "d6",
        "d4"
    ]

    useEffect(() => {

    }, [])

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
                    <Typography variant="subtitle2" style={{ fontSize: "8px" }} >{'AGOTAMIENTO DE HECHIZOS'}</Typography>
                </Box>
            </Paper>
        </div>
    );
}