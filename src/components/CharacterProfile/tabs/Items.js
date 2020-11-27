import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Api from "../../../helpers/api";
import { useWidth } from "../../../helpers/media-query";
import Rations from '../components/Rations';
import Water from '../components/Water';
import Money from '../components/Money';
import AddItem from '../components/AddItem';
import Inventory from '../components/Inventory';
import OtherItems from '../components/OtherItems';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import Collapse from '@material-ui/core/Collapse';
import Durability from '../components/Durability';

const useStyles = makeStyles({
    container: {
        width: "100%",
        paddingLeft: "4px",
        display: "flex"
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
        }
    }
});

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
                            equipped: item["equipped?"] ? item["equipped?"] : false,
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
            if (item.equipped && item.data.properties) {
                const i = item.data.properties.findIndex(it => it.key === "Tamaño");

                if (i >= 0) {
                    const bulk = item.data.properties[i].value;
                    currentSlots += bulk * item.quantity;
                }

                const j = item.data.properties.findIndex(it => it.key === "Capacidad");

                if (j >= 0) {
                    // setMaxSlotModifier(maxSlotModifier + item.data.properties[j].value);
                    const capacity = item.data.properties[j].value;
                    maxSlotModifier += capacity * item.quantity;
                }
            }
        })

        setMaxSlotModifier(maxSlotModifier);
        setCurrentSlots(currentSlots);
    }, [items, props.inventory])

    useEffect(() => {
        if (dialogOpen === true && allItems.length === 0) {
            Api.fetchInternal('/items')
                .then(res => setAllItems(res))
        }
    }, [dialogOpen])

    useEffect(() => {
        const itemsToSet = [];

        categories.forEach(cat => {
            props.items[cat].forEach(item => {
                const itemToSet = {
                    equipped: item["equipped?"] ? item["equipped?"] : false,
                    quantity: item["quantity"] ? item["quantity"] : 0,
                    durability: item["durability"] ? item["durability"] : 0,
                    data: items.filter(obj => obj.data._id === item.id)[0].data
                }

                itemsToSet.push(itemToSet);
            })
        })

        setItems(itemsToSet);
        setTableItems(itemsToSet.filter(items => items.data.type === categories[selectedCategory]));
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
     * Returns a String based on the Int size
     * @param {Number} size 
     */
    const getItemSize = (size) => {
        switch (size) {
            case 1: return "Pequeño";
            case 2: return "Mediano";
            case 3: return "Grande";
            case 6: return "Enorme";
            case 9: return "Gigantesco"
        }
    }

    /**
     * Handles the toggle of equipped and unequipped items
     * @param {Number} index 
     */
    const handleEquipped = (index, e) => {
        // let newItems = [...items];
        let newItems = { ...props.items };
        let itemToChange = newItems[tableItems[index].data.type].findIndex(item => item.id === tableItems[index].data._id);

        newItems[tableItems[index].data.type][itemToChange]["equipped?"] = e.target.checked;

        props.changeStats("equipment", newItems);

        // let itemToChange = newItems.findIndex(newItem => newItem.data._id === tableItems[index].data._id);

        // newItems[itemToChange].equipped = !newItems[itemToChange].equipped;

        // setItems(newItems);
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
        let newItems = { ...props.items };

        newItems[type] = [...newItems[type], item];

        props.changeStats("equipment", newItems);

        let newItem = { ...item };

        newItem.data = data;
        newItem.data.id = newItem.id;
        delete newItem.id;

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
                    case 9: return "Gigantesco"
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
        const itemIndex = currentItems.findIndex(i => i.id == item.data._id);

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
        <div className={classes.container} style={{ flexWrap: width === "xs" && "wrap" }}>
            <Dialog open={dialogOpen} style={{ padding: 10 }}>
                <AddItem
                    categories={categories}
                    items={allItems}
                    addItems={addItem}
                    addNewItem={addNewItem}
                    setDialogOpen={setDialogOpen} />

            </Dialog>
            <Paper variant="outlined" style={{ width: "100%" }}>
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
                                        <TableCell align={width !=="xs" ? "left" : "right"} width={width !== "xs" ? "20%" : "100%"} onClick={() => setOpen(open === index ? -1 : index)}>{row.data.name}</TableCell>
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
                                            <IconButton disabled={!props.editable} onClick={() => removeItem(row.data._id)}>
                                                <CancelIcon fontSize="small" />
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
                                                            {row.data.properties.map(property => (
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
            <Box style={{ display: "flex", flexDirection: "column", width: width === "xs" ? "100%" : "40%" }}>
                <Paper variant="outlined" style={{ padding: "1rem", marginLeft: ".2rem", marginBottom: ".2rem" }}>
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
                <Paper variant="outlined" style={{ minWidth: "25%", padding: "1rem", marginLeft: ".2rem" }}>
                    <Box>
                        <Money
                            changeStats={props.changeStats}
                            money={props.money}
                            editable={props.editable} />
                    </Box>
                </Paper>
                {(props.settings && props.settings.generalOptions.inventorySlots) &&
                    <Paper variant="outlined" style={{ minWidth: "25%", padding: "1rem", marginLeft: ".2rem", marginTop: ".1rem" }}>
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
                <Paper variant="outlined" style={{ minWidth: "25%", padding: "1rem", marginLeft: ".2rem", height: "100%", marginTop: ".1rem" }}>
                    <Box>
                        <OtherItems
                            changeStats={props.changeStats}
                            inventory={props.inventory}
                            editable={props.editable}
                        />
                    </Box>
                </Paper>
            </Box>
        </div>
    );
}