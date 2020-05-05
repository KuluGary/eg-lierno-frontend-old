import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
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

const useStyles = makeStyles({
    container: {
        width: "100%"
    },
    table: {
        width: "100%"
    },
    avatar: {
        borderRadius: 10,
        width: "4rem"
    }
});

export default function Items(props) {
    const classes = useStyles();
    const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState();
    const [tableItems, setTableItems] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);
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
        const categoryNames = ["Objetos", "Armadura", "Objetos Mágicos", "Armas", "Armas mágicas"];

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
                console.log(res)
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

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setSelectedCategory(newValue);
        setTableItems(items.filter(items => items.data.type === categories[newValue]))
    }

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <Tabs
                    variant="scrollable"
                    value={selectedCategory}
                    onChange={handleChange}
                    aria-label="simple tabs example">
                    {categories.map((category, index) => (
                        <Tab key={index} label={categoryNames[index]} {...a11yProps(category)} />
                    ))}
                </Tabs>
                {categories.map((category, index) => (
                    <TabPanel key={index} value={category} index={index}>
                        {category}
                    </TabPanel>
                ))}
                {tableItems.length > 0 &&
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {(width !== "xs") &&
                                    <TableCell></TableCell>
                                }
                                <TableCell align="left">Nombre</TableCell>
                                {(width !== "xs" && width !== "sm") &&
                                    <>
                                        <TableCell align="left">Efecto</TableCell>
                                        <TableCell align="left">Descripción</TableCell>
                                        <TableCell align="left">¿Equipado?</TableCell>
                                        <TableCell align="left">Cantidad</TableCell>
                                    </>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableItems.map((row, index) => (
                                <TableRow key={index}>
                                    {(width !== "xs") &&
                                        <TableCell component="th" scope="row">
                                            <img src={row.data.image.small} className={classes.avatar} />
                                        </TableCell>
                                    }
                                    <TableCell align="left">{row.data.name}</TableCell>
                                    {(width !== "xs" && width !== "sm") &&
                                        <>
                                            <TableCell align="left">{row.data.effect}</TableCell>
                                            <TableCell align="left">{row.data.description}</TableCell>
                                            <TableCell align="left">
                                                <Checkbox
                                                    checked={row.equipped}
                                                />
                                            </TableCell>
                                            <TableCell align="right">{row.quantity}</TableCell>
                                        </>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </Paper>
        </div>
    );
}