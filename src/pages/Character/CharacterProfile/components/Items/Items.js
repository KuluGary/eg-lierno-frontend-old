import React, { useState, useEffect } from 'react';
import _ from "lodash";
import Api from "helpers/api";
import { useWidth } from "hooks/media-query";
import useStyles from './Items.styles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    Tabs,
    Tab,
    Typography,
    Box,
    TextField,
    IconButton,
    Dialog,
    Collapse,
    Grid,
    Divider
} from '@material-ui/core';
import {
    Add as AddIcon,
    Close as CloseIcon
} from '@material-ui/icons';
import {
    Rations,
    Water,
    Money,
    ItemGeneration,
    Inventory,
    OtherItems,
    Durability
} from "./components";

export default function Items(props) {
    const classes = useStyles();
    const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState();
    const [tableItems, setTableItems] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);
    const [currentSlots, setCurrentSlots] = useState(0);
    const [maxSlotModifier, setMaxSlotModifier] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [allItems, setAllItems] = useState([])
    const [open, setOpen] = useState(-1);
    const width = useWidth();

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        );
    }

    useEffect(() => {
        let items = [];
        let cats = [];
        let selectedCategoryNames = [];
        const categoryNames = ["Objetos", "Armadura", "Objetos Mágicos", "Armas", "Vehículos", "Armas mágicas"];

        Object.keys(props.items).forEach((block, index) => {
            if (props.items[block]) {
                cats.push(block)
                selectedCategoryNames.push(categoryNames[index])
            }
        })

        setCategories(cats)
        setCategoryNames(selectedCategoryNames)
        cats.forEach(cat => props.items[cat].forEach(item => item.id && items.push(item.id)))

        setSelectedCategory(0)

        Api.fetchInternal('/items', {
            method: "POST",
            body: JSON.stringify(items)

        })
            .then(async res => {
                let itemsToSet = [];

                cats.forEach(cat => {
                    props.items[cat].forEach(item => {
                        const itemToSet = {
                            equipped: item["equipped"] ? item["equipped"] : false,
                            quantity: item["quantity"] ? item["quantity"] : 0,
                            data: res.filter(obj => obj._id === item.id)[0]
                        }

                        itemsToSet.push(itemToSet);
                    })
                })

                setItems(itemsToSet);
                setTableItems(itemsToSet.filter(items => items.data.type === cats[0]));
            })
    }, [])

    useEffect(() => {
        let currentSlots = 0;
        let maxSlotModifier = 0;

        items.forEach(item => {
            if (item.equipped && item.data?.properties) {
                const i = item.data.properties.findIndex(it => it.key === "Tamaño");

                if (i >= 0) {
                    const bulk = item.data.properties[i].value;
                    currentSlots += bulk * item.quantity;
                }

                const j = item.data.properties.findIndex(it => it.key === "Capacidad");

                if (j >= 0) {
                    const capacity = item.data.properties[j].value;
                    maxSlotModifier += capacity * item.quantity;
                }
            }
        })

        setMaxSlotModifier(maxSlotModifier);
        setCurrentSlots(currentSlots);
    }, [items, props.inventory])

    useEffect(() => {
        if (allItems.length === 0) {
            Api.fetchInternal('/items')
                .then(res => setAllItems(res))
        }
    }, [dialogOpen])

    useEffect(() => {
        const itemsToSet = [];

        categories.forEach(cat => {
            props.items[cat].forEach(item => {
                const itemToSet = {
                    equipped: item["equipped"] ? item["equipped"] : false,
                    quantity: item["quantity"] ? item["quantity"] : 0,
                    durability: item["durability"] ? item["durability"] : 0,
                    data: allItems.filter(obj => obj._id === item.id)[0]
                }

                itemsToSet.push(itemToSet);
            })
        })

        setItems(itemsToSet);
        setTableItems(itemsToSet.filter(items => items?.data?.type === categories[selectedCategory]));
    }, [props.items])

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    /**
     * Sets the table sections based on category and resets the collapsable
     * @param {event} event 
     * @param {String} newValue 
     */
    const handleChange = (event, newValue) => {
        setOpen(-1)
        setSelectedCategory(newValue);
        setTableItems(items.filter(items => items.data.type === categories[newValue]))
    }

    /**
     * Handles the toggle of equipped and unequipped items
     * @param {Number} index 
     */
    const handleEquipped = (index, e) => {
        // let newItems = [...items];
        let newItems = { ...props.items };
        let itemToChange = newItems[tableItems[index].data.type].findIndex(item => item.id === tableItems[index].data._id);

        newItems[tableItems[index].data.type][itemToChange]["equipped"] = e.target.checked;

        props.changeStats("equipment", newItems);
    }

    /**
     * Handles changing the quantity of an object
     * @param {Number} index 
     * @param {Event} event 
     */
    const handleQuantityChange = (index, event) => {
        const handlePropItems = (index, event) => {
            let newItems = { ...props.items }
            let itemToChange = newItems[tableItems[index].data.type].findIndex(item => item.id === tableItems[index].data._id);

            newItems[tableItems[index].data.type][itemToChange].quantity = parseInt(event.target.value);
            props.changeStats("equipment", newItems);
        }

        handlePropItems(index, event);
    }

    /**
     * Handles adding an item
     * @param {Object} item 
     * @param {String} type 
     */
    const addItem = (item, type) => {
        const index = items.findIndex(el => el.data._id === item.id);

        if (index < 0) {
            let newItems = { ...props.items };

            newItems[type] = [...newItems[type], item];

            props.changeStats("equipment", newItems);
        } else {
            let newItems = [...items];
            newItems[index].quantity = newItems[index].quantity + 1;

            newItems = { ...props.items };

            const i = newItems[type].findIndex(el => el.id === item.id);
            newItems[type][i].quantity = newItems[type][i].quantity + 1;

            props.changeStats("equipment", newItems);

        }

        setDialogOpen(false)
    }

    /**
     * Handles adding a new item to DB
     * @param {Object} item 
     * @param {String} type 
     * @param {Object} data 
     */
    const addNewItem = (item, type, data) => {
        Api.fetchInternal('/items')
            .then(res => setAllItems(res))
            .then(() => {
                const newItems = _.cloneDeep(props.items);

                newItems[type] = [...newItems[type], item];

                props.changeStats("equipment", newItems);
            })

        setDialogOpen(false)
    }

    /**
     * Handles removing an item from the list
     * @param {String} id 
     */
    const removeItem = (id) => {
        let newItems = { ...props.items };

        newItems[categories[selectedCategory]] = newItems[categories[selectedCategory]].filter(newItem => newItem.id !== id);

        props.changeStats("equipment", newItems);
    }

    /**
     * Handles parsing the object properties
     * @param {Object} metadata 
     */
    const parseMetadata = (metadata) => {
        switch (metadata.key) {
            case "Tamaño":
                switch (metadata.value) {
                    case 1: return "Pequeño";
                    case 2: return "Mediano";
                    case 3: return "Grande";
                    case 6: return "Enorme";
                    default: return "Gigantesco";
                }
            default: return metadata.value
        }
    }

    /**
     * Handles the text message of status
     * @param {Object} item 
     */
    const handleDurabilityStatus = (item) => {
        const indexOf = item.data.properties.findIndex(i => i.key === "Tamaño");
        const maxDurability = item.data.properties[indexOf]["value"];

        const currentItems = props.items[categories[selectedCategory]];
        const itemIndex = currentItems.findIndex(i => i.id === item.data._id);

        const durability = props.items[categories[selectedCategory]][itemIndex].durability || 0;

        if (durability !== undefined) {
            if (durability < maxDurability) {
                if (durability > 0) {
                    return <Box style={{ border: "1px solid #cf7d01", padding: ".2rem .5rem", borderRadius: 20 }}>{'Dañado'}</Box>
                } else {
                    return <Box style={{ border: '1px solid #46cf01', padding: ".2rem .5rem", borderRadius: 20 }}>{'Impecable'}</Box>
                }
            } else {
                return <Box style={{ border: "1px solid #cf4601", padding: ".2rem .5rem", borderRadius: 20 }}>{'Roto'}</Box>
            }
        } else {
            return <Box style={{ color: "green" }}>{'Bien'}</Box>
        }
    }

    return (
        <Grid container spacing={1} className={classes.container}>
            <Dialog open={dialogOpen} style={{ padding: 10 }} maxWidth={"sm"} fullWidth>
                <ItemGeneration
                    categories={categories}
                    categoryNames={categoryNames}
                    items={allItems}
                    addItems={addItem}
                    addNewItem={addNewItem}
                    setDialogOpen={setDialogOpen} />

            </Dialog>
            <Grid item lg={8}>
                <Paper variant="outlined" style={{ width: "100%", height: "100%" }}>
                    <Box style={{ display: "flex", justifyContent: "space-between" }}>
                        <Tabs
                            variant="scrollable"
                            value={selectedCategory}
                            onChange={handleChange}
                            aria-label="simple tabs example">
                            {categories.map((category, index) => (
                                <Tab key={index} label={categoryNames[index]} {...a11yProps(category)} />
                            ))}
                        </Tabs>
                        <Box>
                            <IconButton
                                disabled={!props.editable}
                                onClick={() => setDialogOpen(true)}
                                component="span">
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider />
                    {categories.map((category, index) => (
                        <TabPanel key={index} value={category} index={index}>
                            {category}
                        </TabPanel>
                    ))}
                    {tableItems.length > 0 &&
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {(width !== "xs" && width !== "sm") &&
                                        <>
                                            <TableCell align="left"></TableCell>
                                            <TableCell align="left">Nombre</TableCell>
                                            <TableCell align="left">Descripción</TableCell>
                                            <TableCell align="left">Cantidad</TableCell>
                                            <TableCell align="left"></TableCell>
                                        </>
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableItems.map((row, index) => (
                                    <>
                                        <TableRow hover key={index}>
                                            <TableCell align="left">
                                                {(width !== "xs" &&
                                                    <Checkbox
                                                        color="default"
                                                        checked={row.equipped}
                                                        disabled={!props.editable}
                                                        onClick={(e) => handleEquipped(index, e)}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell align={width !== "xs" ? "left" : "right"} width={width !== "xs" ? "20%" : "100%"} onClick={() => setOpen(open === index ? -1 : index)}>{row.data.name}</TableCell>
                                            {(width !== "xs" && <TableCell align="left" onClick={() => setOpen(open === index ? -1 : index)}>{row.data.description}</TableCell>)}
                                            {(width !== "xs" && <TableCell>
                                                <TextField
                                                    type="number"
                                                    defaultValue={0}
                                                    disabled={!props.editable}
                                                    value={row.quantity}
                                                    className={classes.textField}
                                                    onChange={(event) => handleQuantityChange(index, event)}
                                                    InputProps={{
                                                        classes: {
                                                            input: classes.textField,
                                                        },
                                                        inputProps: { min: 0 }
                                                    }} />
                                            </TableCell>)}
                                            {(width !== "xs" &&
                                                <TableCell align="left">
                                                    <IconButton size="small" disabled={!props.editable} onClick={() => removeItem(row.data._id)}>
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                <Collapse in={open === index} timeout="auto" unmountOnExit>
                                                    <Box margin={1}>
                                                        <Typography >Propiedades</Typography>
                                                        <Box style={{ display: "flex" }}>
                                                            <Box marginLeft={3} marginRight={3}>
                                                                {row.data.properties?.map(property => (
                                                                    <Box>
                                                                        <Box component={'span'}><b>{property.key + ': '}</b></Box>
                                                                        <Box component={'span'}>{parseMetadata(property)}</Box>
                                                                    </Box>
                                                                ))}
                                                            </Box>
                                                            {row.data.properties.findIndex(i => i.key === "Tamaño") > -1 &&
                                                                <Box>
                                                                    {(props.settings && props.settings.generalOptions.durability) &&
                                                                        (row.data.type !== "items") &&
                                                                        <>
                                                                            <Box component={'span'}><b>{'Durabilidad: '}</b></Box>
                                                                            <Box style={{ display: "flex", alignItems: "center" }}>
                                                                                {/* {generateDurability(row)} */}
                                                                                <Durability
                                                                                    length={row.data.properties.filter(i => i.key === "Tamaño")[0].value}
                                                                                    durability={row.durability}
                                                                                    tableItems={tableItems}
                                                                                    changeStats={props.changeStats}
                                                                                    item={row}
                                                                                    items={props.items}
                                                                                    index={index}
                                                                                />
                                                                                {handleDurabilityStatus(row)}
                                                                            </Box>
                                                                        </>
                                                                    }
                                                                </Box>
                                                            }
                                                        </Box>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    }
                </Paper>
            </Grid>
            <Grid item lg={4} container style={{ rowGap: 8 }}>
                <Grid item lg={12}>
                    <Paper variant="outlined" style={{ padding: "1rem", height: "100%" }}>
                        <Box>
                            <Rations
                                rations={props.rations}
                                changeStats={props.changeStats}
                                editable={props.editable} />
                            <Water
                                waterskin={props.waterskin}
                                changeStats={props.changeStats}
                                editable={props.editable} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item lg={12}>
                    <Paper variant="outlined" style={{ minWidth: "25%", padding: "1rem", height: "100%" }}>
                        <Box>
                            <Money
                                changeStats={props.changeStats}
                                money={props.money}
                                editable={props.editable} />
                        </Box>
                    </Paper>
                </Grid>
                {(props.settings && props.settings.generalOptions.inventorySlots) &&
                    <Paper variant="outlined" style={{ minWidth: "25%", padding: "1rem" }}>
                        <Box>
                            <Inventory
                                changeStats={props.changeStats}
                                inventory={props.inventory}
                                strength={props.abilityScores["strength"]}
                                race={props.race}
                                currentSlots={currentSlots}
                                maxSlotModifier={maxSlotModifier}
                                editable={props.editable} />
                        </Box>
                    </Paper>}
                <Grid item lg={12}>

                    <Paper variant="outlined" style={{ minWidth: "25%", padding: "1rem", height: "100%" }}>
                        <Box>
                            <OtherItems
                                changeStats={props.changeStats}
                                // inventory={props.inventory}
                                items={props.otheritems}
                                editable={props.editable}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}