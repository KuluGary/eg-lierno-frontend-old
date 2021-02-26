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
import { FormControl, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Api from 'helpers/api';

const useStyles = makeStyles({
    container: {
        width: "100%",
        paddingLeft: "4px",
        // display: "flex",
        // flex: 1
    },
    table: {
        // width: "70%"
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
        textAlign: 'center',
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

export default function AddItem(props) {
    const classes = useStyles();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [addNew, setAddNew] = useState(false);
    const [itemToAdd, setItemToAdd] = useState({
        "name": "",
        "type": "",
        "image": {
            "small": "",
            "large": null
        },
        "description": "",
        "effect": "",
        "data": {
        }
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

    return (
        <div className={classes.container}>
            <DialogTitle>Añade un item</DialogTitle>
            <DialogContent>
                <Box style={{ width: "100%" }}>
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
                    {!addNew ?
                        <>
                            <Box component="p">
                                <Select
                                    value={selectedCategory}
                                    onChange={(event) => setSelectedCategory(event.target.value)}
                                    fullWidth>
                                    {props.categories.map(category => (
                                        <MenuItem value={category}>
                                            <Typography style={{ textTransform: "capitalize" }}>
                                                {category}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <Box component="p">
                                <Select
                                    value={selectedItem}
                                    onChange={(event) => setSelectedItem(event.target.value)}
                                    fullWidth>
                                    {props.items.filter(item => item.type === selectedCategory).map(item => (
                                        <MenuItem value={item._id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </>
                        : <Box>
                            <TextField
                                required
                                value={itemToAdd.name}
                                onChange={(event) => addNewItem("name", event.target.value)}
                                label={'Nombre del objeto'}
                                fullWidth />
                            <Box style={{ display: "flex", justifyContent: "space-between", marginTop: ".5rem" }}>
                                <FormControl style={{ width: "45%" }} required>
                                    <InputLabel id="typology-label">Tipología</InputLabel>
                                    <Select
                                        fullWidth
                                        value={itemToAdd.type}
                                        onChange={(event) => addNewItem("type", event.target.value)}
                                        id="typology-label"
                                        required
                                    >
                                        {props.categories.map(cat => <MenuItem value={cat}>{cat}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <TextField
                                    style={{ width: "45%" }}
                                    fullWidth
                                    label={'Efecto'}
                                    value={itemToAdd.effect}
                                    onChange={(event) => addNewItem("effect", event.target.value)}
                                    required />
                            </Box>
                            <TextField
                                required
                                fullWidth
                                multiline
                                label={'Descripción'}
                                value={itemToAdd.description}
                                onChange={(event) => addNewItem("description", event.target.value)}
                            />
                            <Box style={{ display: "flex", marginTop: ".5rem" }}>
                                <Box style={{ width: "45%" }}>
                                    <img alt="item" style={{ width: "4rem", height: "4rem", margin: "0 auto" }} src={itemToAdd.image.small} />
                                </Box>
                                <TextField
                                    style={{ width: "45%" }}
                                    required
                                    fullWidth
                                    multiline
                                    value={itemToAdd.image.small}
                                    onChange={(event) => addNewItem("image", { large: null, small: event.target.value })}
                                    label={'Imágen'}
                                />
                            </Box>
                            <Box style={{ display: "flex", marginTop: ".5rem", justifyContent: "space-between" }}>
                                <TextField
                                    label={'Coste'}
                                    style={{ width: "45%" }}
                                    value={itemToAdd.data.cost}
                                    onChange={(event) => addNewItem("data", { ...itemToAdd.data, cost: event.target.value })}
                                    fullWidth />
                                <FormControl style={{ width: "45%" }}>
                                    <InputLabel id="bulk-label">Tamaño</InputLabel>
                                    <Select
                                        fullWidth
                                        id="bulk-label"
                                        value={itemToAdd.data.bulk}
                                        onChange={(event) => addNewItem("data", { ...itemToAdd.data, blk: event.target.value })}
                                    >
                                        {bulkOptions.map(bulk => <MenuItem value={bulk.value}>{bulk.label}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>}
                </Box>
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