import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
    root: {
        width: "100%",
        // margin: "0 .1rem .2rem .1rem"
        margin: ".1rem"
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

export default function SpellCasting(props) {
    const classes = useStyles();
    const options = [
        "N/A",
        "FUE",
        "DES",
        "CONST",
        "INT",
        "SAB",
        "CAR"
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
                        value={props.ability}
                        defaultValue={options[0]}
                        onChange={(event) => props.changeStats("spellcastingAbility", event.target.value)}
                    >
                        {options.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                    </Select>
                    <Typography variant="subtitle2" style={{ fontSize: "8px" }} >{'HAB. DE HECHIZOS'}</Typography>
                </Box>
            </Paper>
        </div>
    );
}