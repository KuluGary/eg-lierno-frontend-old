import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, FormControlLabel, TextField, Grid, Dialog, Divider } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Api from 'helpers/api';
import Autocomplete from '@material-ui/lab/Autocomplete';
import HTMLEditor from 'components/HTMLEditor/HTMLEditor';
import useStyles from "./SpellGeneration.styles";

export function SpellGeneration(props) {
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

    const resetComponent = () => {
        setAddNew(false);
        setSpellToAdd({
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
        props.setDialogOpen(false);
    }

    return (
        <Dialog maxWidth={"sm"} fullWidth open={props.open} className={classes.container}>
            <DialogTitle>Añade un hechizo</DialogTitle>
            <DialogContent>
                <Box style={{ width: "100%" }}>
                    <Box component="p" style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="caption">
                            {'¿Crear un nuevo hechizo?'}
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
                                    {spellOptions && <Autocomplete
                                        fullWidth
                                        options={spellOptions.sort((a, b) => a.stats.level - b.stats.level)}
                                        getOptionLabel={option => option.name}
                                        groupBy={option => option.stats.level}
                                        renderGroup={params => [
                                            <div className={classes.subListHeader} key={params.key}>
                                                {console.log(params.children)}
                                                <Typography variant="overline">
                                                    {params.group > 0 ? "Nivel " + params.group : "Trucos"}
                                                </Typography>
                                                <Divider />
                                            </div>,
                                            params.children.sort((a, b) => a.props.children.toLowerCase().localeCompare(b.props.children.toLowerCase()))
                                        ]}
                                        onChange={(_, newValue) => setSpellToAdd(newValue)}
                                        // onChange={(event) => addNewSpell("stats", { ...spellToAdd.stats, school: event.target.value })}
                                        renderInput={(params) => <TextField {...params} label="Buscar hechizos..." variant="outlined" />}
                                    />}
                                </FormControl>
                            </Box>
                        </>
                        : <Grid container spacing={2}>
                            <Grid item xl={5}>
                                <TextField
                                    required
                                    variant="outlined"
                                    value={spellToAdd.name}
                                    onChange={(event) => addNewSpell("name", event.target.value)}
                                    label={'Nombre del hechizo'}
                                    fullWidth />
                            </Grid>
                            <Grid item xl={2}>
                                <TextField
                                    type="number"
                                    fullWidth
                                    required
                                    variant="outlined"
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
                            </Grid>
                            <Grid item xl={5}>
                                <FormControl fullWidth required variant="outlined">
                                    <InputLabel id="school-label">Escuela</InputLabel>
                                    <Select
                                        fullWidth
                                        value={spellToAdd.stats.school}
                                        onChange={(event) => addNewSpell("stats", { ...spellToAdd.stats, school: event.target.value })}
                                        id="school-label"
                                        label="Escuela"
                                        required
                                    >
                                        {schoolOptions.map(option => <MenuItem value={option}>{option}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xl={4}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={spellToAdd.stats.castingTime}
                                    className={classes.textField}
                                    label={'T. de lanzamiento'}
                                    InputProps={{
                                        classes: {
                                            input: classes.textField,
                                        },
                                    }}
                                    onChange={(event) => addNewSpell("stats", { ...spellToAdd.stats, castingTime: event.target.value })} />
                            </Grid>
                            <Grid item xl={4}>
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    label={'Duración'}
                                    value={spellToAdd.stats.duration}
                                    onChange={(event) => addNewSpell("stats", { ...spellToAdd.stats, duration: event.target.value })}
                                />
                            </Grid>
                            <Grid item xl={4}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={spellToAdd.stats.range}
                                    className={classes.textField}
                                    label={'Alcance'}
                                    InputProps={{
                                        classes: {
                                            input: classes.textField,
                                        },
                                    }}
                                    onChange={(event) => addNewSpell("stats", { ...spellToAdd.stats, range: event.target.value })} />
                            </Grid>
                            <Grid item xl={12}>
                                <Box style={{ display: "flex", justifyContent: "center" }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={components.includes("V")}
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
                                                onClick={() => components.includes("M") ? setComponents(components.filter(item => item !== "M")) : setComponents([...components, "M"])}
                                                color="default"
                                            />
                                        }
                                        label={'Material'}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xl={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    label={'Descripción de los componentes'}
                                    value={spellToAdd.stats.components.description}
                                    onChange={(event) => addNewSpell("stats", { ...spellToAdd.stats, components: { ...spellToAdd.stats.components, description: event.target.value } })}
                                />
                            </Grid>
                            <Grid item xl={12}>
                                <HTMLEditor
                                    iconSize={"small"}
                                    placeholder={"Descripción del hechizo"}
                                    value={spellToAdd.stats.description}
                                    setState={(HTMLDescription) => addNewSpell("stats", { ...spellToAdd.stats, description: HTMLDescription })} />
                            </Grid>
                        </Grid>
                    }
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={resetComponent} color="default">
                    Cerrar
                </Button>
                <Button variant={"outlined"} onClick={saveNewSpell} color="default">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}