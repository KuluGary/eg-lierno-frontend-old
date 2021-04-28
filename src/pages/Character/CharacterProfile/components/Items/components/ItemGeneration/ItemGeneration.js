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
import { FormControl, TextField, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel';
import Api from 'helpers/api';
import HTMLEditor from 'components/HTMLEditor/HTMLEditor';
import useStyles from './ItemGeneration.styles';

export function ItemGeneration(props) {
    const classes = useStyles();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [addNew, setAddNew] = useState(false);
    const [itemToAdd, setItemToAdd] = useState({
        "name": "",
        "type": props.categories[0],
        "image": {
            "small": "",
            "large": null
        },
        "description": "",
        "effect": "",
        "properties": []
    })
    const bulkOptions = [
        {
            "label": "Diminuto",
            "value": 0
        },
        {
            "label": "Pequeño",
            "value": 1
        },
        {
            "label": "Mediano",
            "value": 2
        },
        {
            "label": "Grande",
            "value": 3
        },
        {
            "label": "Enorme",
            "value": 6
        },
        {
            "label": "Gigantesco",
            "value": 9
        }
    ];
    useEffect(() => {
        if (!selectedCategory) {
            setSelectedCategory(props.categories[0]);
        }
    }, [props.categories])

    const addItem = () => {
        let item = {};

        if (addNew) {
            Api.fetchInternal("/item", {
                method: "POST",
                body: JSON.stringify(itemToAdd)
            })
                .then(res => {
                    item = {
                        id: res,
                        quantity: 1,
                        equipped: true,
                        // data: itemToAdd
                    }

                    props.addNewItem(item, itemToAdd.type, itemToAdd);
                })
        } else {
            item = {
                id: selectedItem,
                quantity: 1,
                equipped: true
            }
            props.addItems(item, selectedCategory);
        }

    }

    const addNewItem = (key, event) => {
        let newItem = { ...itemToAdd };

        newItem[key] = event;

        setItemToAdd(newItem);
    }

    const getProperty = (name) => {
        return itemToAdd.properties[itemToAdd.properties.findIndex(property => property.name === name)];
    }

    const ArmorProperties = () => (
        <>
            <Grid item lg={4}>
                <TextField
                    variant="outlined"
                    label="Tipo de protección" />
            </Grid>
            <Grid item lg={4}>
                <TextField
                    variant="outlined"
                    label="Clase de armadura" />
            </Grid>
            <Grid item lg={4}>
                <TextField
                    variant="outlined"
                    label="Penalización" />
            </Grid>
            <Grid item lg={4}>
                <TextField
                    variant="outlined"
                    label="Precio" />
            </Grid>
            <Grid item lg={4}>
                <TextField
                    variant="outlined"
                    label="Peso" />
            </Grid>
            <Grid item lg={4}>
                <TextField
                    variant="outlined"
                    label="Tamaño" />
            </Grid>
            <Grid item lg={4}>
                <TextField
                    variant="outlined"
                    label="Requisitos" />
            </Grid>
        </>
    )

    return (
        <div className={classes.container}>
            <DialogTitle>Añade un item</DialogTitle>
            <DialogContent>
                <Box component="p" style={{ display: "flex", alignItems: "center" }}>
                    <Typography>
                        {'¿Añadir nuevo objeto?'}
                    </Typography>
                    <Checkbox
                        color="default"
                        checked={addNew}
                        onClick={() => setAddNew(!addNew)}
                    />
                </Box>
                <Grid container spacing={2}>
                    {!addNew ?
                        <>
                            <Grid item lg={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="demo-simple-select-label">Tipo de Objeto</InputLabel>
                                    <Select
                                        id="school-label"
                                        label="Tipo de Objeto"
                                        variant="outlined"
                                        value={selectedCategory}
                                        onChange={(event) => setSelectedCategory(event.target.value)}
                                        fullWidth>
                                        {props.categories.map((category, i) => (
                                            <MenuItem value={category}>
                                                <Typography style={{ textTransform: "capitalize" }}>
                                                    {props.categoryNames[i]}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={8}>
                                <Autocomplete
                                    fullWidth
                                    options={props.items.filter(item => item.type === selectedCategory)}
                                    getOptionLabel={option => option.name}
                                    onChange={(_, newValue) => setSelectedItem(newValue._id)}
                                    renderInput={(params) => <TextField
                                        {...params}
                                        label={`Buscar ${props.categoryNames[props.categories.findIndex(category => category === selectedCategory)]?.toLowerCase()}...`}
                                        variant="outlined" />}
                                />
                            </Grid>
                        </>
                        : <>
                            <Grid item lg={6}>
                                <TextField
                                    required
                                    value={itemToAdd.name}
                                    onChange={(event) => addNewItem("name", event.target.value)}
                                    label={'Nombre del objeto'}
                                    fullWidth
                                    variant="outlined" />
                            </Grid>
                            <Grid item lg={6}>
                                <FormControl fullWidth variant="outlined" required>
                                    <InputLabel id="typology-label">Tipología</InputLabel>
                                    <Select
                                        fullWidth
                                        label="Tipo de Objeto"
                                        variant="outlined"
                                        value={itemToAdd.type}
                                        onChange={(event) => addNewItem("type", event.target.value)}
                                        id="typology-label"
                                        required
                                    >
                                        {props.categories.map((cat, i) => <MenuItem value={cat}>{props.categoryNames[i]}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {itemToAdd.type === "items" &&
                                <>
                                    <Grid item lg={4}>
                                        <TextField
                                            required
                                            value={getProperty("Tamaño")}
                                            onChange={(event) => addNewItem("properties",
                                                [...itemToAdd.properties, { key: "Precio", value: event.target.value }]
                                            )}
                                            label="Precio"
                                            fullWidth
                                            variant="outlined" />
                                    </Grid>
                                    <Grid item lg={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="bulk-label" variant="outlined">Tamaño</InputLabel>
                                            <Select
                                                fullWidth
                                                variant="outlined"
                                                id="bulk-label"
                                                label="Tamaño"
                                                value={getProperty("Tamaño")}
                                                onChange={(event) => addNewItem("properties",
                                                    [...itemToAdd.properties, { key: "Tamaño", value: event.target.value }]
                                                )}
                                            >
                                                {bulkOptions.map(bulk => <MenuItem value={bulk.value}>{bulk.label}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4}>
                                        <TextField
                                            variant="outlined"
                                            label="Peso"
                                            value={getProperty("Tamaño")}
                                            onChange={(event) => addNewItem("properties",
                                                [...itemToAdd.properties, { key: "Peso", value: event.target.value }]
                                            )} />
                                    </Grid>
                                </>}
                            <Grid item lg={12}>
                                <HTMLEditor
                                    iconSize={"small"}
                                    placeholder={'Descripción'}
                                    value={itemToAdd.description}
                                    setState={(HTMLDescription) => addNewItem("description", HTMLDescription)} />
                            </Grid>
                        </>}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setDialogOpen(false)} color="default">
                    Cerrar
                     </Button>
                <Button variant={"outlined"} onClick={addItem} color="default">
                    Guardar
                     </Button>
            </DialogActions>
        </div>
    );
}