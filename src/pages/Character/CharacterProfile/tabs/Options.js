import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Checkbox, Divider, FormControlLabel, Typography } from '@material-ui/core';

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
            exhaustionTable: false,
            stress: false,
            inventorySlots: false,
            experience: false,
            training: false,
            durability: false,
            openSkills: false
        }
    })

    const [interacted, setInteracted] = useState(false);
    const classes = useStyles();

    const changeOptions = (key, value) => {
        if (!interacted) {
            setInteracted(true);
        }

        setCharacterOptions({ ...characterOptions, generalOptions: { ...characterOptions.generalOptions, [key]: value } })
    }

    useEffect(() => {
        if (interacted === true) {
            props.changeOptions(characterOptions);
        }
    }, [characterOptions]);

    useEffect(() => {
        if (settings) {
            setCharacterOptions(settings)
        }
    }, [settings])


    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Typography variant="h6">
                    General
                </Typography>
                <Divider style={{ margin: "1rem 0" }} />
                <Box component="p">
                    <Typography variant="body2">
                        Estas opciones tienen un impacto mínimo en el juego y sirven como información adicional de tu personaje.
                    </Typography>
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
                                checked={characterOptions.generalOptions.openSkills}
                                onClick={() => changeOptions("openSkills", !characterOptions.generalOptions.openSkills)}
                                disabled={!props.editable}
                                color="default"
                            />
                        }
                        label={'Modificadores de habilidad libres'}
                    />
                </Box>
                <Divider style={{ margin: "1rem 0" }} />
                <Typography variant="h6">
                    Dificultad
                </Typography>
                <Divider style={{ margin: "1rem 0" }} />
                <Box component="p">
                    <Typography variant="body2">
                        Estas opciones modifican la ficha de personaje para añadir un grado de dificultad superior a tu campaña.
                    </Typography>
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
            </Paper>
        </div >
    );
}