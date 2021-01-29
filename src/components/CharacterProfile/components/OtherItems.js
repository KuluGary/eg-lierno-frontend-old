import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    root: {
        height: "100%",
        width: "100%"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        height: "100%",
        width: "100%"
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center",
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 11,
    },
    textField: {
        fontSize: 11,
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

export default function OtherItems(props) {
    const classes = useStyles();
    const [items, setItems] = useState([]);
    const [interacted, setInteracted] = useState(false)

    useEffect(() => {
        if (!Object.is(props.inventory, items) && interacted) {
            props.changeStats("inventory", items)
        }
    }, [items]);

    const changeName = (event, index) => {
        let newItems = [...items];

        newItems[index]["name"] = event.target.value;

        setItems(newItems);
        setInteracted(true);
    }

    const changeQuantity = (event, index) => {
        let newItems = [...items];

        newItems[index]["quantity"] = event.target.value;

        setItems(newItems);
        setInteracted(true);
    }

    const addWound = () => {
        setItems([...items, {
            name: null,
            quantity: 0
        }])

        setInteracted(true);
    }

    const removeItem = (index) => {
        let newItems = [...items];

        newItems.splice(index, 1);

        setItems(newItems);
        setInteracted(true);
    }

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'OTROS OBJETOS'}</Typography>
                    <Divider style={{ margin: "0" }} />
                    <Box style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                        {items.map((el, index) => (
                            <Box style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                <Box style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                    <TextField
                                        value={el.name}
                                        fullWidth
                                        disabled={!props.editable}
                                        style={{ marginRight: ".3rem" }}
                                        onChange={(event) => changeName(event, index)}
                                        placeholder="Nombre del objeto"
                                        InputProps={{
                                            classes: {
                                                input: classes.resize,
                                            }
                                        }}></TextField>
                                    <TextField
                                        type="number"
                                        value={el.quantity}
                                        defaultValue={0}
                                        fullWidth
                                        disabled={!props.editable}
                                        style={{ marginRight: ".3rem", maxWidth: "20%" }}
                                        onChange={(event) => changeQuantity(event, index)}
                                        className={classes.textField}
                                        InputProps={{
                                            classes: {
                                                input: classes.textField,
                                            },
                                            inputProps: { min: 0 }
                                        }}></TextField>
                                </Box>
                                {props.editable &&
                                    <IconButton size="small" onClick={() => removeItem(index)} style={{ maxWidth: "20%" }}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                }
                            </Box>
                        ))}
                    </Box>
                    <Divider style={{ margin: ".3rem 0" }} />
                    {props.editable &&
                        <Box style={{ float: "left" }}>
                            <Button
                                variant="outlined"
                                onClick={addWound}>
                                <Typography variant="subtitle2" style={{ fontSize: "8px", textAlign: "left" }} >{'+ Añadir'}</Typography>
                            </Button>
                        </Box>
                    }
                </Box>
            </Paper>
        </div>
    );
}