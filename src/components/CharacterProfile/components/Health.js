import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { StringUtil } from "../../../helpers/string-util";

const useStyles = makeStyles({
    root: {
        height: "100%",
        // margin: "0 .1rem .2rem .1rem",
        margin: ".1rem",
        paddingBottom: ".2rem"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        height: "100%"
    },
    stat: {
        textAlign: "center",
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default function Health(props) {
    const classes = useStyles();
    const healthOptions = [
        {
            label: StringUtil.generiza('Robusto', 'Robusta', 'Robuste', props.pronoun),
            background: '#46cf01',
        }, {
            label: 'Saludable',
            background: '#7dcf01',
        }, {
            label: 'Bien',
            background: '#b4cf01'
        }, {
            label: StringUtil.generiza('Golpeado', 'Golpeada', 'Golpeade', props.pronoun),
            background: "#cfb401"
        }, {
            label: StringUtil.generiza('Ensangrentado', 'Ensangrentada', 'Ensangrentade', props.pronoun),
            background: "#cf7d01"
        }, , {
            label: StringUtil.generiza('Herido', 'Herida', 'Heride', props.pronoun),
            background: "#cf4601"
        }, {
            label: StringUtil.generiza('Crítico', 'Crítica', 'Crítique', props.pronoun),
            background: "#cf0101"
        }
];

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'SALUD'}</Typography>
                    <Divider style={{ margin: ".3rem 0" }} />
                    <Box style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", height: "90%" }}>
                        {healthOptions.map((option, index) => (
                            <Typography
                                variant="subtitle2"
                                style={{
                                    fontSize: "11px",
                                    borderRadius: 20,
                                    cursor: 'pointer',
                                    backgroundColor: (props.health !== undefined ? props.health : 2) === index ? option.background : 'transparent'
                                }}
                                onClick={() => props.editable && props.changeStats("healthStatus", index)}
                            >{option.label}</Typography>
                        ))}
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}