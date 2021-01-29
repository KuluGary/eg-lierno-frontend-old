import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, FormControlLabel, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Api from '../../../helpers/api';

const useStyles = makeStyles({
    container: {
        width: "100%",
        paddingLeft: "4px"
    },
    avatar: {
        borderRadius: 10,
        width: "4rem"
    },
    resize: {
        fontSize: 8,
        textAlign: 'center'
    },
    textField: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

export default function SpellCreation(props) {
    const classes = useStyles();
    const [addNew, setAddNew] = useState(false)
    const [components, setComponents] = useState([]);
    const [spellOptions, setSpellOptions] = useState([]);
    const [spellToAdd, setSpellToAdd] = useState({
        "name": "",
        "stats": {
            "level": 1,
            "school": "",
            "castingTime": "",
            "range": "",
            "components": {
                "type": "",
                "description": null
            },
            "duration": "",
            "attack": "",
            "description": ""
        }
    })
    const schoolOptions = [
        "Abjuración",
        "Adivinación",
        "Conjuración",
        "Encantamiento",
        "Evocación",
        "Ilusión",
        "Nigromancia",
        "Transmutación"
    ]
    
    useEffect(() => {
        if (spellOptions.length === 0) {
            Api.fetchInternal('/spells')
                .then(res => setSpellOptions(res))
        }
    }, [spellOptions])

    const addNewSpell = (key, event) => {
        let newItem = { ...spellToAdd };

        newItem[key] = event;

        setSpellToAdd(newItem);
    }

    const saveNewSpell = () => {
        if (!addNew) {
            props.addNewSpell(spellToAdd._id, spellToAdd)
        } else {

            let newSpell = { ...spellToAdd };
            
            let componentsToAdd = components.sort((a, b) => a > b ? -1 : 1).join(',')
            
            newSpell.stats.components = componentsToAdd;
            
            Api.fetchInternal('/spell', {
                method: "POST",
                body: JSON.stringify(newSpell)
            })
            .then(res => props.addNewSpell(res, newSpell))
        }
    }

    return (
        <div className={classes.container}>
            <DialogTitle>Añade un hechizo</DialogTitle>
            <DialogContent>
                <Box style={{ width: "100%" }}>
                    <Box component="p" style={{ display: "flex", alignItems: "center" }}>
                        <Typography>
                            {'¿Añadir nuevo hechizo?'}
                        </Typography>
                        <Checkbox
                            color="default"
                            checked={addNew}
                            onClick={() => setAddNew(!addNew)}
                        />
                    </Box>
                    {!addNew ?
                        <>
                            <Box component="p">
                                <FormControl required style={{ width: "100%" }}>
                                    <InputLabel id="typology-label">Hechizo</InputLabel>
                                    <Select
                                        fullWidth
                                        value={spellToAdd}
                                        onChange={(event) =>  setSpellToAdd(event.target.value)}
                                        id="typology-label"
                                        required
                                    >
                                        {spellOptions.map(option => <MenuItem value={option}>{option.name}</MenuItem>)}
                                    </Select>
                                </FormControl>                                
                            </Box>
                        </>
                        : <Box>
                            <TextField
                                required
                                value={spellToAdd.name}
                                onChange={(event) => addNewSpell("name", event.target.value)}
                                label={'Nombre del hechizo'}
                                fullWidth />
                            <Box style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <TextField
                                    type="number"
                                    style={{ width: "15%" }}
                                    value={spellToAdd.stats.level}
                                    className={classes.textField}
                                    label={'Nivel'}
                                    InputProps={{
                                        classes: {
                                            input: classes.textField,
                                        },
                                        inputProps: { min: 0, max: 9 }
                                    }}
                                    onChange={(event) => addNewSpell("stats", { ...spellToAdd.stats, level: parseInt(event.target.value) })} />
                                <FormControl style={{ width: "80%" }} required>
                                    <InputLabel id="typology-label">Escuela</InputLabel>
                                    <Select
                                        fullWidth
                                        value={spellToAdd.stats.school}
                                        onChange={(event) => addNewSpell("stats", { ...spellToAdd.stats, school: event.target.value })}
                                        id="typology-label"
                                        required
                                    >
                                        {schoolOptions.map(option => <MenuItem value={option}>{option}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box style={{ display: "flex", justifyContent: "space-between", marginTop: ".5rem" }}>
                                <TextField
                                    fullWidth
                                    value={spellToAdd.stats.castingTime}
                                    style={{ marginRight: "1rem" }}
                                    className={classes.textField}
                                    label={'Tiempo de lanzamiento'}
                                    InputProps={{
                                        classes: {
                                            input: classes.textField,
                                        },
                                    }}
                                    onChange={(event) => addNewSpell("stats", { ...spellToAdd.stats, castingTime: event.target.value })} />
                                <TextField
                                    fullWidth
                                    style={{ marginLeft: "1rem" }}
                                    value={spellToAdd.stats.range}
                                    className={classes.textField}
                                    label={'Alcance'}
                                    InputProps={{
                                        classes: {
                                            input: classes.textField,
                                        },
                                    }}
                                    onChange={(event) => addNewSpell("stats", { ...spellToAdd.stats, range: event.target.value })} />
                            </Box>
                            <Typography variant="h6" style={{ fontSize: 14 }}>Componentes</Typography>
                            <Box style={{ display: "flex", justifyContent: "center" }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={components.includes("V")}
                                            // onChange={handleChange}
                                            onClick={() => components.includes("V") ? setComponents(components.filter(item => item !== "V")) : setComponents([...components, "V"])}
                                            color="default"
                                        />
                                    }
                                    label={'Verbal'}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={components.includes("S")}
                                            // onChange={handleChange}
                                            onClick={() => components.includes("S") ? setComponents(components.filter(item => item !== "S")) : setComponents([...components, "S"])}
                                            color="default"
                                        />
                                    }
                                    label={'Somático'}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={components.includes("M")}
                                            // onChange={handleChange}
                                            onClick={() => components.includes("M") ? setComponents(components.filter(item => item !== "M")) : setComponents([...components, "M"])}
                                            color="default"
                                        />
                                    }
                                    label={'Material'}
                                />
                            </Box>
                            <TextField
                                fullWidth
                                multiline
                                label={'Descripción de los componentes'}
                                value={spellToAdd.stats.components.description}
                                onChange={(event) => addNewSpell("stats", { ...spellToAdd.stats, components: { ...spellToAdd.stats.components, description: event.target.value } })}
                            />
                            <TextField
                                required
                                fullWidth
                                multiline
                                label={'Duración'}
                                value={spellToAdd.stats.duration}
                                onChange={(event) => addNewSpell("stats", { ...spellToAdd.stats, duration: event.target.value })}
                            />
                            <TextField
                                required
                                fullWidth
                                multiline
                                label={'Descripción'}
                                value={spellToAdd.stats.description}
                                onChange={(event) => addNewSpell("stats", { ...spellToAdd.stats, description: event.target.value })}
                            />
                        </Box>}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setDialogOpen(false)} color="default">
                    Cerrar
                </Button>
                <Button variant={"outlined"} onClick={saveNewSpell} color="default">
                    Guardar
                </Button>
            </DialogActions>
        </div>
    );
}