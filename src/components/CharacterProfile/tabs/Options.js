import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import { Checkbox, FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: "100%",
        paddingLeft: "4px"
    },
    paper: {
        margin: 0,
        padding: "1rem",
        height: "100%"
    },
    action: {
        margin: "1rem 0",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    fullWidthDivier: {
        margin: ".5rem 0"
    },
    image: {
        display: "block",
        margin: "0 auto",
        maxHeight: "100vh",
        maxWidth: "100%"
    }
});

export default function Options(props) {
    const { settings } = props;
    const [characterOptions, setCharacterOptions] = useState({
        generalOptions: {
            inventory: "simple", // ["simple", "darker-dungeons"] 
            encumberance: false, // [true, false]
            exhaustionTable: false, // [true, false]
            stress: false, // [true,false]
            afflictions: false, // [true,false]
            survivalConditions: false, // [true,false]
            inventorySlots: false, // [true,false]
            deathSaveSuccess: false,
            health: false,
            experience: false,
            training: false,
            durability: false
        }
    })

    const [interacted, setInteracted] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if (interacted === true) {
            changeOptions(characterOptions);
        }
    }, [characterOptions, interacted, settings]);

    useEffect(() => {
        if (settings) {
            setCharacterOptions(settings)
        }
    }, [settings])

    const changeOptions = (key, value) => {
        if (!interacted) {
            setInteracted(true);
        }

        setCharacterOptions({ ...characterOptions, generalOptions: { ...characterOptions.generalOptions, [key]: value } })
    }

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item md={6} sm={12}>
                        <Box component="p">
                            <FormControlLabel
                                labelPlacement="start"
                                control={
                                    <Checkbox
                                        checked={characterOptions.generalOptions.encumberance}
                                        onClick={() => changeOptions("encumberance", !characterOptions.generalOptions.encumberance)}
                                        disabled={!props.editable}
                                        color="default"
                                    />
                                }
                                label={'Traba'}
                            />
                        </Box>
                        <Box component="p">
                            <FormControlLabel
                                labelPlacement="start"
                                control={
                                    <Checkbox
                                        checked={characterOptions.generalOptions.exhaustionTable}
                                        onClick={() => changeOptions("exhaustionTable", !characterOptions.generalOptions.exhaustionTable)}
                                        disabled={!props.editable}
                                        color="default"
                                    />
                                }
                                label={'Tabla de exhausto'}
                            />
                        </Box>
                        <Box component="p">
                            <FormControlLabel
                                labelPlacement="start"
                                control={
                                    <Checkbox
                                        checked={characterOptions.generalOptions.stress}
                                        onClick={() => changeOptions("stress", !characterOptions.generalOptions.stress)}
                                        disabled={!props.editable}
                                        color="default"
                                    />
                                }
                                label={'Estrés'}
                            />
                        </Box>
                        <Box component="p">
                            <FormControlLabel
                                labelPlacement="start"
                                control={
                                    <Checkbox
                                        checked={characterOptions.generalOptions.afflictions}
                                        onClick={() => changeOptions("afflictions", !characterOptions.generalOptions.afflictions)}
                                        disabled={!props.editable}
                                        color="default"
                                    />
                                }
                                label={'Aflicciones'}
                            />
                        </Box>
                        <Box component="p">
                            <FormControlLabel
                                labelPlacement="start"
                                control={
                                    <Checkbox
                                        checked={characterOptions.generalOptions.health}
                                        onClick={() => changeOptions("health", !characterOptions.generalOptions.health)}
                                        disabled={!props.editable}
                                        color="default"
                                    />
                                }
                                label={'Salud'}
                            />
                        </Box>
                        <Box component="p">
                            <FormControlLabel
                                labelPlacement="start"
                                control={
                                    <Checkbox
                                        checked={characterOptions.generalOptions.survivalConditions}
                                        onClick={() => changeOptions("survivalConditions", !characterOptions.generalOptions.survivalConditions)}
                                        disabled={!props.editable}
                                        color="default"
                                    />
                                }
                                label={'Condiciones de supervivencia'}
                            />
                        </Box>
                        <Box component="p">
                            <FormControlLabel
                                labelPlacement="start"
                                control={
                                    <Checkbox
                                        checked={characterOptions.generalOptions.inventorySlots}
                                        onClick={() => changeOptions("inventorySlots", !characterOptions.generalOptions.inventorySlots)}
                                        disabled={!props.editable}
                                        color="default"
                                    />
                                }
                                label={'Huecos de inventario'}
                            />
                        </Box>
                        <Box component="p">
                            <FormControlLabel
                                labelPlacement="start"
                                control={
                                    <Checkbox
                                        checked={characterOptions.generalOptions.durability}
                                        onClick={() => changeOptions("durability", !characterOptions.generalOptions.durability)}
                                        disabled={!props.editable}
                                        color="default"
                                    />
                                }
                                label={'Durabilidad'}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </div >
    );
}